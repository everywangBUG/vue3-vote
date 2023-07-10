import { myRequest } from "..";
import type { IVote } from "@/types/vote/types";

export function postVoteData(formData: IVote) {
  return myRequest.post({
    url: '/vote',
    data: formData
  })
}