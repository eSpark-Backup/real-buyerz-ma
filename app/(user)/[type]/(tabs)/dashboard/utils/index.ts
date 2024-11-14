import { api } from "api";
import { ProposalData } from "app/(user)/[type]/myProposals/utils";

interface FindAllProposalResponse {
  success: boolean;
  message: string;
  response: {
    timestamp_ms: number;
    action: string;
    data: ProposalData;
  };
}

const handleGetAllProposals = async (): Promise<{
  status: boolean;
  proposalData?: ProposalData;
  message?: string;
}> => {
  try {
    const { data } = await api.get<FindAllProposalResponse>('/userProperty/user');
    if (data?.success) {
      return {
        status: true,
        proposalData: data.response.data,
      };
    }

    return { status: false, message: data?.message };
  } catch (error) {
    return { status: false, message: "An error occurred." };
  }
};

const handleGetAllProposalList = async (userPropertyID:string): Promise<{
  status: boolean;
  proposalData?: ProposalData;
  message?: string;
}> => {
  try {
    const { data } = await api.get<FindAllProposalResponse>(`/bidding/viewProposal/${userPropertyID}`);
    if (data?.success) {
      return {
        status: true,
        proposalData: data.response.data,
      };
    }

    return { status: false, message: data?.message };
  } catch (error) {
    return { status: false, message: "An error occurred." };
  }
};

export { handleGetAllProposals,handleGetAllProposalList };
