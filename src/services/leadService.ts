export interface LeadData {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  insurance_type?: string;
  insurance_partner?: string;
  referral_id: string;
  lead_status?: string;
  sum_insured_plan?: string;
  email: string;
  full_name: string;
  phone: string;
  street_address: string;
  postal_code: string;
  time_stamp: string;
  family_members?: string;
  member_1_name?: string;
  member_1_relation?: string;
  member_1_dob?: string;
  member_1_medical_status?: string;
  member_1_gender?: string;
  member_1_condition_desc?: string;
  member_2_name?: string;
  member_2_relation?: string;
  member_2_dob?: string;
  member_2_medical_status?: string;
  member_2_gender?: string;
  member_2_condition_desc?: string;
  member_3_name?: string;
  member_3_relation?: string;
  member_3_dob?: string;
  member_3_medical_status?: string;
  member_3_gender?: string;
  member_3_condition_desc?: string;
  member_4_name?: string;
  member_4_relation?: string;
  member_4_dob?: string;
  member_4_medical_status?: string;
  member_4_gender?: string;
  member_4_condition_desc?: string;
  member_5_name?: string;
  member_5_relation?: string;
  member_5_dob?: string;
  member_5_medical_status?: string;
  member_5_gender?: string;
  member_5_condition_desc?: string;
  nominee_name?: string;
  nominee_dob?: string;
  nominee_relation?: string;
  doctype: string;
}

const getCacheKey = (source: string, employeeId: string) => `leads_${source}_${employeeId}`;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fetchLeads = async (source: string, employeeId: string, cookies: string): Promise<LeadData[]> => {
  const cacheKey = getCacheKey(source, employeeId);
  
  // Check cache first
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  try {
    const response = await fetch('https://n8n.gopocket.in/webhook/hrms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies
      },
      body: JSON.stringify({
        source,
        employeeId,
        action: 'fetch_leads'
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch leads: ${response.status}`);
    }

    const data = await response.json();
    
    // Handle both single object and array responses
    const dataArray: LeadData[] = Array.isArray(data) ? data : [data];
    
    // Filter leads to show only those for the current employee
    const filteredLeads = dataArray.filter(lead => lead.referral_id === employeeId);
    
    // Cache the results
    localStorage.setItem(cacheKey, JSON.stringify({
      data: filteredLeads,
      timestamp: Date.now()
    }));
    
    return filteredLeads;
  } catch (error) {
    console.error('Lead fetch error:', error);
    throw error;
  }
};

export const clearLeadsCache = (employeeId: string) => {
  const sources = ['insurance', 'term-life', 'porting', 'contact-us'];
  sources.forEach(source => {
    localStorage.removeItem(getCacheKey(source, employeeId));
  });
};