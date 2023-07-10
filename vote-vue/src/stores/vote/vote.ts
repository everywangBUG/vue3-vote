import { VOTE } from "@/constants/vote";
import { postVoteData } from "@/service/vote/vote";
import type { IVote } from "@/types/vote/types";
import { defineStore } from "pinia";

const useVoteStore = defineStore(VOTE, {
  state: (): any => ({

  }),
  actions: {
    async postCreateVoteAction(voteData: IVote) {
      try {
        await postVoteData(voteData)
      } catch(err) {
        console.log(err)
      }
    }
  }
})

export default useVoteStore