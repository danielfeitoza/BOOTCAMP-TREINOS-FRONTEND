import {
  pairSmartwatch as pairSmartwatchRequest,
  type PairSmartwatchBody,
  type pairSmartwatchResponse,
} from "@/app/_lib/api/fetch-generated";

export async function pairSmartwatch(
  payload: PairSmartwatchBody,
): Promise<pairSmartwatchResponse> {
  return pairSmartwatchRequest(payload);
}
