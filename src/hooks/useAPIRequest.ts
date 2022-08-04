import { ErrorVariant } from '@/@types/ErrorVariant'

type AnyFunction = (...args: unknown[]) => unknown

type IDoRequestProps<Request extends AnyFunction, SuccessType> = {
  /* Argumentos necessários para fazer a requisição */
  args: Parameters<Request>

  /* Função executada quando a requisição é concluida com sucesso */
  onSuccess?: (data: SuccessType) => void

  /* Função executada quando a requisição não é concluida com sucesso */
  onError?: (error: ErrorVariant[keyof ErrorVariant]) => void
}

type DoRequest<Request extends AnyFunction, SuccessType> = ({
  args,
  onSuccess,
  onError,
}: IDoRequestProps<Request, SuccessType>) => Promise<void>

type ResultOrError<SuccessType> = SuccessType | ErrorVariant

function isError<Request>(
  result: Request | ErrorVariant,
): result is ErrorVariant {
  if (Array.isArray((result as ErrorVariant).errors?.data)) {
    return true
  } else {
    return (result as ErrorVariant).errors?.statusCode > 400
  }
}

export function useAPIRequest<Request extends AnyFunction, SuccessType>(
  handler: Request,
) {
  const doRequest: DoRequest<Request, SuccessType> = async ({
    args,
    onSuccess,
    onError,
  }: IDoRequestProps<Request, SuccessType>) => {
    const result = (await handler(...args)) as ResultOrError<SuccessType>

    if (isError<ResultOrError<SuccessType>>(result)) {
      /*
        Caso queira validar um erro, pelo status code ou outra validação expecifica,
        basta validar acima do retorno do erro 
      */

      if (typeof onError === 'function') {
        const { errors } = result
        await onError(errors)
      }

      return
    } else {
      if (typeof onSuccess === 'function') {
        await onSuccess(result)
      }
    }
  }

  return doRequest
}
