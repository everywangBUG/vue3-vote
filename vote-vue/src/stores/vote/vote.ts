import { VOTE } from "@/constants/vote";
import { getVoteInfo, postVoteData } from "@/service/vote/vote";
import type { IVote } from "@/types/vote/types";
import { defineStore } from "pinia";

const useVoteStore = defineStore(VOTE, {
  state: (): any => ({
    voteId: ''
  }),
  actions: {
    async postCreateVoteAction(voteData: IVote) {
      try {
        const res = await postVoteData(voteData)
        this.voteId = res.data.result.voteId
      } catch(err) {
        console.log(err)
      }
    },
    async getVoteInfoAction(voteId: number) {
      try {
        const voteInfoRes =  await getVoteInfo(voteId)
        console.log('voteInfoRes', voteInfoRes)
      } catch (err) {
        console.log(err)
      }
    }
  }
})

export default useVoteStore