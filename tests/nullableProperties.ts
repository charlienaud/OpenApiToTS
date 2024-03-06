export type APISchemas = {
  Product: {
    /*
     * Format: int64
     * @example 10
     */
    id: number /*
     * Format: float
     * @example 2.2
     */
    weight: number | null
    title: string | null
    status: "draft" | "active" | "archived" | null
    /* @example true */
    in_stock: boolean | null
    tags: Array<string> | null
    metadata: {
      /* Format: date-time */
      created: string
      /* Format: date-time */
      updated: string
    } | null
  }
}

export type APIEndpoints = {
  "/products/{productId}": {
    responses: { get: APISchemas["Product"] }
    requests: {
      method?: "get"
      urlParams: {
        /* Format: int64 */
        productId: number
      }
    }
  }
}

export type APIPaths = keyof APIEndpoints

export type APIRequests<T extends APIPaths> = APIEndpoints[T]["requests"]

export type APIMethods<T extends APIPaths> = NonNullable<
  APIRequests<T>["method"]
>

export type APIRequest<T extends APIPaths, M extends APIMethods<T>> = Omit<
  {
    [MM in APIMethods<T>]: APIRequests<T> & { method: MM }
  }[M],
  "method"
> & { method?: M }

type DefaultToGet<T extends string | undefined> = T extends string ? T : "get"

export type APIResponse<T extends APIPaths, M extends string | undefined> =
  DefaultToGet<M> extends keyof APIEndpoints[T]["responses"]
    ? APIEndpoints[T]["responses"][DefaultToGet<M>]
    : never
