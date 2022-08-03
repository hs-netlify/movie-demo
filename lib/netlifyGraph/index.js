/* eslint-disable */
// @ts-nocheck
// GENERATED VIA NETLIFY AUTOMATED DEV TOOLS, EDIT WITH CAUTION!
const buffer = require("buffer")
const crypto = require("crypto")
const https = require("https")
const process = require("process")

exports.verifySignature = (input) => {
  const secret = input.secret
  const body = input.body
  const signature = input.signature

  if (!signature) {
    console.error('Missing signature')
    return false
  }

  const sig = {}
  for (const pair of signature.split(',')) {
    const [key, value] = pair.split('=')
    sig[key] = value
  }

  if (!sig.t || !sig.hmac_sha256) {
    console.error('Invalid signature header')
    return false
  }

  const hash = crypto
    .createHmac('sha256', secret)
    .update(sig.t)
    .update('.')
    .update(body)
    .digest('hex')

  if (
    !crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(sig.hmac_sha256, 'hex')
    )
  ) {
    console.error('Invalid signature')
    return false
  }

  if (parseInt(sig.t, 10) < Date.now() / 1000 - 300 /* 5 minutes */) {
    console.error('Request is too old')
    return false
  }

  return true
}

// Basic LRU cache implementation
const makeLRUCache = (max) => {
  return { max: max, cache: new Map() };
};

const getFromCache = (lru, key) => {
  const item = lru.cache.get(key);
  if (item) {
    lru.cache.delete(key);
    lru.cache.set(key, item);
  }
  return item;
};

const setInCache = (lru, key, value) => {
  if (lru.cache.has(key)) {
    lru.cache.delete(key);
  }
  if (lru.cache.size == lru.max) {
    lru.cache.delete(lru.first());
  }
  lru.cache.set(key, value);
};

// Cache the results of the Netlify Graph API for conditional requests
const cache = makeLRUCache(100);

const calculateCacheKey = (payload) => {
  return JSON.stringify(payload);
};

const httpFetch = (siteId, options) => {
      const reqBody = options.body || null
      const userHeaders = options.headers || {}
      const headers = {
        ...userHeaders,
        'Content-Type': 'application/json',
        'Content-Length': reqBody.length,
      }

      const timeoutMs = 30_000

      const reqOptions = {
        method: 'POST',
        headers: headers,
        timeout: timeoutMs,
      }

  const url = 'https://graph.netlify.com/graphql?app_id=' + siteId

  const respBody = []

  return new Promise((resolve, reject) => {
    const req = https.request(url, reqOptions, (res) => {
      if (res.statusCode && (res.statusCode < 200 || res.statusCode > 299)) {
        return reject(
          new Error(
            "Netlify Graph return non-OK HTTP status code" + res.statusCode,
          ),
        )
      }

      res.on('data', (chunk) => respBody.push(chunk))

      res.on('end', () => {
        const resString = buffer.Buffer.concat(respBody).toString()
        resolve(resString)
      })
    })

    req.on('error', (error) => {
      console.error('Error making request to Netlify Graph:', error)
    })

    req.on('timeout', () => {
      req.destroy()
      reject(new Error('Request to Netlify Graph timed out'))
    })

    req.write(reqBody)
    req.end()
  })
}



const fetchNetlifyGraph = function fetchNetlifyGraph(input) {
  const query = input.query;
  const docId = input.doc_id;
  const operationName = input.operationName;
  const variables = input.variables;

  const options = input.options || {};
  const accessToken = options.accessToken;
  const siteId = options.siteId || process.env.SITE_ID;

  const payload = {
    query: query,
    doc_id: docId,
    variables: variables,
    operationName: operationName,
  };

  let cachedOrLiveValue = new Promise((resolve) => {
  const cacheKey = calculateCacheKey(payload);

  // Check the cache for a previous result
  const cachedResultPair = getFromCache(cache, cacheKey);

  let conditionalHeaders = {
    'If-None-Match': ''
  };
  let cachedResultValue;

  if (cachedResultPair) {
    const [etag, previousResult] = cachedResultPair;
    conditionalHeaders = {
      'If-None-Match': etag
    };
    cachedResultValue = previousResult;
  }

  const response = httpFetch(siteId, {
    method: 'POST',
    headers: {
      ...conditionalHeaders,
      Authorization: accessToken ? 'Bearer ' + accessToken : '',
    },
    body: JSON.stringify(payload),
  });

  response.then((result) => {
    // Check response headers for a 304 Not Modified
    if (result.status === 304) {
      // Return the cached result
      resolve(cachedResultValue);
    }
    else if (result.status === 200) {
      // Update the cache with the new etag and result
      const etag = result.headers.get('etag');
      const resultJson = result.json();
      resultJson.then((json) => {
        if (etag) {
          // Make a note of the new etag for the given payload
          setInCache(cache, cacheKey, [etag, json])
        };
        resolve(json);
      });
    } else {
      return result.json().then((json) => {
        resolve(json);
      });
    }
  });
  });

  return cachedOrLiveValue
}


exports.verifyRequestSignature = (request, options) => {
  const event = request.event
  const secret = options.webhookSecret || process.env.NETLIFY_GRAPH_WEBHOOK_SECRET
  const signature = event.headers['x-netlify-graph-signature']
  const body = event.body

  if (!secret) {
    console.error(
      'NETLIFY_GRAPH_WEBHOOK_SECRET is not set, cannot verify incoming webhook request'
    )
    return false
  }

  return verifySignature({ secret, signature, body: body || '' })
}

exports.fetchExampleQuery = (
      variables,
      options
    ) => {
      return fetchNetlifyGraph({
        query: `query ExampleQuery {
  __typename
}`,
        operationName: "ExampleQuery",
        variables: variables,
        options: options,
        fetchStrategy: "POST",
      });
    }


/**
 * The generated NetlifyGraph library with your operations
 */
const functions = {
  /**
  * An example query to start with.
  */
  fetchExampleQuery: exports.fetchExampleQuery
}

exports.default = functions

exports.handler = () => {
      // return a 401 json response
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: 'Unauthorized',
        }),
      }
    }