import apiClient from "@/lib/apiClient";

export const getCoachStatistics = async (coachId: string) => {
  try {
    const response = await apiClient.get(`/coach/${coachId}/statistics`);
    return response.data;
  } catch (error: unknown) {
    console.error('Failed to fetch coach statistics:', error);
    throw error;
  }
};

export const getCoachActivities = async (coachId: string) => {
  try {
    const response = await apiClient.get(`/coach/${coachId}/activity`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch coach activities:', error);
    throw error;
  }
};

export const getAllBlogs = async (params: { sortBy?: string; order?: string; page?: number; limit?: number }) => {
  try {
    const { sortBy = 'dateCreated', order = 'asc', page = 1, limit = 10 } = params;
    const response = await apiClient.get('/blog/get-blogs', {
      params: { sortBy, order, page, limit },
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Failed to fetch blogs:', error);
    throw error;
  }
};