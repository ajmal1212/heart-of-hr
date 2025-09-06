import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, Phone, MapPin, Users, IndianRupee } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchLeads, LeadData } from '@/services/leadService';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const Lead = () => {
  const { user, cookies } = useAuth();
  const { toast } = useToast();
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('health-insurance');

  const tabConfig = [
    { value: 'health-insurance', label: 'Health Insurance', source: 'insurance' },
    { value: 'term-life', label: 'Term Life', source: 'term-life' },
    { value: 'porting', label: 'Porting', source: 'porting' },
    { value: 'contact-us', label: 'Contact Us', source: 'contact-us' }
  ];

  const loadLeads = async (source: string) => {
    if (!user?.employeeId) return;

    setLoading(true);
    try {
      const leadsData = await fetchLeads(source, user.employeeId, cookies);
      setLeads(leadsData);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error",
        description: "Failed to fetch leads. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentTab = tabConfig.find(tab => tab.value === activeTab);
    if (currentTab) {
      loadLeads(currentTab.source);
    }
  }, [activeTab, user?.employeeId]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch {
      return dateString;
    }
  };

  const getInsuranceTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'health':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'life':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'term':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const renderLeadCard = (lead: LeadData) => (
    <Card key={lead.name} className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{lead.full_name}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4" />
              {formatDate(lead.time_stamp)}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {lead.insurance_type && (
              <Badge className={getInsuranceTypeColor(lead.insurance_type)}>
                {lead.insurance_type}
              </Badge>
            )}
            {lead.insurance_partner && (
              <Badge variant="outline">
                {lead.insurance_partner}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{lead.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{lead.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-sm">{lead.street_address}</span>
            </div>
          </div>
          <div className="space-y-3">
            {lead.sum_insured_plan && (
              <div className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{lead.sum_insured_plan}</span>
              </div>
            )}
            {lead.family_members && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{lead.family_members} family members</span>
              </div>
            )}
            {lead.nominee_name && (
              <div className="text-sm">
                <span className="font-medium">Nominee:</span> {lead.nominee_name} ({lead.nominee_relation})
              </div>
            )}
          </div>
        </div>
        
        {/* Family Members Details */}
        {lead.family_members && parseInt(lead.family_members) > 1 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Family Members:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {[1, 2, 3, 4, 5].map(num => {
                const memberName = lead[`member_${num}_name` as keyof LeadData] as string;
                const memberRelation = lead[`member_${num}_relation` as keyof LeadData] as string;
                const memberDob = lead[`member_${num}_dob` as keyof LeadData] as string;
                
                if (!memberName) return null;
                
                return (
                  <div key={num} className="flex justify-between">
                    <span>{memberName} ({memberRelation})</span>
                    <span className="text-muted-foreground">{formatDate(memberDob)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Lead Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage and track your insurance leads across different categories
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {tabConfig.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabConfig.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{tab.label} Leads</CardTitle>
                <CardDescription>
                  {loading ? 'Loading leads...' : `${leads.length} leads found`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-muted-foreground">Loading leads...</p>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No leads found for {tab.label}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leads.map(renderLeadCard)}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Lead;