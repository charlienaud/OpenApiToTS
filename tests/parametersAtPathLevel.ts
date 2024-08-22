export type APISchemas = {
  Products: Array<APISchemas["Product"]>
  Product: {
    /*
     * Format: int64
     * @example 10
     */
    id: number /*
     * Format: float
     * @example 2.2
     */
    weight: number
    title: string
    status: "draft" | "active" | "archived"
    /* @example true */
    in_stock: boolean
    tags: Array<string>
    metadata: {
      /* Format: date-time */
      created: string
      /* Format: date-time */
      updated: string
    }
  }
}

export type APIEndpoints = {
  "/products": {
    responses: { get: APISchemas["Products"] }
    requests: {
      method?: "get"
      query?: { locale?: string; status?: "active" | "draft" | "archived" }
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
