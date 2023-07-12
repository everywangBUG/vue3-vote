import { myRequest } from "..";
import type { IVote } from "@/types/vote/types";

export function postVoteData(formData: IVote) {
  return myRequest.post({
    url: '/vote',
    data: formData
  })
}

export function getVoteInfo(id: number) {
  return myRequest.post({
    url: `/vote/${id}`
  })
}