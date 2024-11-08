import { api } from 'api';
import { Amenity, PropertyDataItem, PropertyItem, PropertyType } from '../../(tabs)/home/utils';

interface ApiResponse {
  success: boolean;
  message: string;
  response: ResponseData;
}
interface ResponseData {
  timestamp_ms: number;
  action: string;
  data: ProposalData
}

export interface ProposalData {
  activeProposals: PropertyItem[];
  archivedProposals: PropertyItem[];
  rejectedProposals: PropertyItem[];
  submittedProposals: PropertyItem[];
  trashProperties: PropertyItem[];
  active: PropertyItem[];
  draft: PropertyItem[];
  trash: PropertyItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}


const handleGetAllPropertyProposals = async (isProposal:boolean): Promise<{ status: boolean; proposalData?: ProposalData; message?: string }> => {
  try {
    const { data } = await api.get<ApiResponse>(`/property/agent?page=1&pageSize=20&proposals=${isProposal}`);
    if (data?.response?.data) {
      return {
        status: true,
        proposalData: data.response.data,
      };
    }
    return { status: false, message: data?.message || 'No data found.' };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'An error occurred while fetching favorites.';
    return { status: false, message: errorMessage };
  }
};

const handleDeletePropertyProposal = async (proposalID:string): Promise<{ status: boolean; message?: string }> => {
  try {
    const { data } = await api.delete<ApiResponse>(`/property/${proposalID}`);
    if (data?.success) {
      console.log(`Agaya ${JSON.stringify(data)}`)
      return {
        status: true
      };
    }
    console.log(`Agaya ${JSON.stringify(data)}`)
    return { status: false, message: data?.message || 'No data found.' };
  } catch (error: any) {
    console.log(`Agaya ${JSON.stringify(error)}`)
    const errorMessage = error.response?.data?.message || 'An error occurred while fetching favorites.';
    return { status: false, message: errorMessage };
  }
};


export { handleGetAllPropertyProposals, handleDeletePropertyProposal};