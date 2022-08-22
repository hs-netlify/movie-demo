/* eslint-disable */
    // @ts-nocheck
    // GENERATED VIA NETLIFY AUTOMATED DEV TOOLS, EDIT WITH CAUTION!
    
    export type NetlifyGraphFunctionOptions = {
      /**
       * The accessToken to use for the request
       */
      accessToken?: string;
      /**
       * The siteId to use for the request
       * @default process.env.SITE_ID
       */
      siteId?: string;
    }
    
    export type WebhookEvent = {
      body: string;
      headers: Record<string, string | null | undefined>;
    };
    
    export type GraphQLError = {
      "path": Array<string | number>;
      "message": string;
      "extensions": Record<string, unknown>;
    };
    
    
    
    export type NpmDownloadsInput = {
  /**
 * Find the package by its name
 */
 "name": string
};
    
    export type NpmDownloads = {
  /**
  * Any data from the function will be returned here
  */
data: {
  /**
  * The root for npm queries
  */
npm: {
  /**
  * Find a npm package member by its npm name, e.g. `"fela"`
  */
package?: {
  /**
  * Summary download stats for a package
  */
downloads: {
  /**
  * The download status for this package over the last month
  */
lastMonth?: {
  /**
  * The download stats for the given package and range. Check out explanation of how [npm download counts work](http://blog.npmjs.org/post/92574016600/numeric-precision-matters-how-npm-download-counts), including "what counts as a download?"
  */
count: number;
};
  /**
  * The download status for this package over the last day
  */
lastDay?: {
  /**
  * The download stats for the given package and range. Check out explanation of how [npm download counts work](http://blog.npmjs.org/post/92574016600/numeric-precision-matters-how-npm-download-counts), including "what counts as a download?"
  */
count: number;
};
  /**
  * The download status for this package over the last week
  */
lastWeek?: {
  /**
  * The download stats for the given package and range. Check out explanation of how [npm download counts work](http://blog.npmjs.org/post/92574016600/numeric-precision-matters-how-npm-download-counts), including "what counts as a download?"
  */
count: number;
};
};
};
};
};
  /**
  * Any errors from the function will be returned here
  */
errors?: Array<GraphQLError>;
};
    
    /**
     * Get the downloads for a package (last week, last month, and in the last 24 hours) from npm given the package name.
     */
    export function fetchNpmDownloads(
      variables: NpmDownloadsInput,
      options?: NetlifyGraphFunctionOptions
    ): Promise<NpmDownloads>;


    export type ExampleQuery = {
  /**
  * Any data from the function will be returned here
  */
data: {
  __typename: unknown;
};
  /**
  * Any errors from the function will be returned here
  */
errors?: Array<GraphQLError>;
};
    
    /**
     * 
     */
    export function fetchExampleQuery(
      /**
      * Pass `{}` as no variables are defined for this function.
      */
      variables: Record<string, never>,
      options?: NetlifyGraphFunctionOptions
    ): Promise<ExampleQuery>;


    export type Leads = {
  /**
  * Any data from the function will be returned here
  */
data: {
  /**
  * The root for Salesforce queries
  */
salesforce: {
  /**
  * Collection of Salesforce Leads
  */
leads?: {
  /**
  * List of Salesforce Leads
  */
nodes: Array<{
  /**
  * First Name
  */
firstName?: string;
  /**
  * Last Name
  */
lastName: string;
  /**
  * Email
  */
email?: string;
  /**
  * Created Date
  */
createdDate: string;
}>;
};
};
};
  /**
  * Any errors from the function will be returned here
  */
errors?: Array<GraphQLError>;
};
    
    /**
     * List leads on Salesforce, ordered by when they were created.
     */
    export function fetchLeads(
      /**
      * Pass `{}` as no variables are defined for this function.
      */
      variables: Record<string, never>,
      options?: NetlifyGraphFunctionOptions
    ): Promise<Leads>;
    
    export interface Functions {
      /**
    * Get the downloads for a package (last week, last month, and in the last 24 hours) from npm given the package name.
    */
    fetchNpmDownloads: typeof fetchNpmDownloads,
  /**
    * 
    */
    fetchExampleQuery: typeof fetchExampleQuery,
  /**
    * List leads on Salesforce, ordered by when they were created.
    */
    fetchLeads: typeof fetchLeads
    }
    
    export const functions: Functions;
    
    export default functions;
    