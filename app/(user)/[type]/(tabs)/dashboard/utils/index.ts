import { api } from "api";
import { ProposalData } from "app/(user)/[type]/myProposals/utils";
import { PropertyItem } from "../../home/utils";

interface FindAllProposalResponse {
  success: boolean;
  message: string;
  response: {
    timestamp_ms: number;
    action: string;
    data?: ProposalData|ProposalViewData;
  };
}

interface ProposalViewData {
  items:ProposalDataItem[]
  userProperty:PropertyItem
}

export interface ProposalDataItem {
  id: string;
  userPropertyId: string;
  agentPropertyId: string;
  agentStatus: string;
  userStatus: string;
  createdAt: string;
  updatedAt: string;
  agentProperty: PropertyItem;
}

const handleGetAllProposals = async (filters?: Record<string, any>): Promise<{
  status: boolean;
  proposalData?: ProposalData;
  message?: string;
}> => {
  try {
    const { data } = await api.get<FindAllProposalResponse>('/userProperty/user', filters);
    if (data?.success) {
      return {
        status: true,
        proposalData: data.response.data as ProposalData
      };
    }

    return { status: false, message: data?.message };
  } catch (error) {
    return { status: false, message: "An error occurred." };
  }
};

const handleGetAllProposalList = async (userPropertyID:string): Promise<{
  status: boolean;
  proposalViewData?: ProposalViewData;
  message?: string;
}> => {
  try {
    const { data } = await api.get<FindAllProposalResponse>(`/bidding/viewProposal/${userPropertyID}`);
    if (data?.success) {
      return {
        status: true,
        proposalViewData: data.response.data as ProposalViewData
      };
    }

    return { status: false, message: data?.message };
  } catch (error) {
    return { status: false, message: "An error occurred." };
  }
};

const handleAcceptProposal = async (id:string): Promise<{
  status: boolean;
  message?: string;
}> => {
  try {
    const { data } = await api.post<FindAllProposalResponse>(`/bidding/acceptProposal/${id}`);
    if (data?.success) {
      return {
        status: true
      };
    }
    console.log("accept data" +JSON.stringify(data))
    return { status: false, message: data?.message };
  } catch (error) {
    return { status: false, message: "An error occurred." };
  }
};

const handleRejectProposal = async (id:string): Promise<{
  status: boolean;
  message?: string;
}> => {
  try {
    const { data } = await api.post<FindAllProposalResponse>(`/bidding/rejectProposal/${id}`);
    if (data?.success) {
      return {
        status: true
      };
    }
    console.log("reject data" +JSON.stringify(data))
    return { status: false, message: data?.message };
  } catch (error) {
    return { status: false, message: "An error occurred." };
  }
};

export { handleGetAllProposals,handleGetAllProposalList, handleAcceptProposal, handleRejectProposal };
