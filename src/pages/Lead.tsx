import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchLeads, LeadData, clearLeadsCache } from '@/services/leadService';
import { useToast } from '@/hooks/use-toast';
import LeadTable from '@/components/Lead/LeadTable';

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

  const refreshLeads = async () => {
    const currentTab = tabConfig.find(tab => tab.value === activeTab);
    if (currentTab && user?.employeeId) {
      // Clear cache and reload
      clearLeadsCache(user.employeeId);
      await loadLeads(currentTab.source);
    }
  };

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
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">{tab.label} Leads</h2>
                <p className="text-muted-foreground">
                  {loading ? 'Loading leads...' : `${leads.length} leads found`}
                </p>
              </div>
              <Button 
                onClick={refreshLeads} 
                variant="outline" 
                disabled={loading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading leads...</p>
              </div>
            ) : leads.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No leads found for {tab.label}</p>
                  <Button onClick={refreshLeads} variant="outline" className="mt-4">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <LeadTable leads={leads} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Lead;