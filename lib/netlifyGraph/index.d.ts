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
    