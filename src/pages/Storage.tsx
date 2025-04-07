
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StorageHeader from '@/components/storage/StorageHeader';
import StoragePlans from '@/components/storage/StoragePlans';
import StorageHowItWorks from '@/components/storage/StorageHowItWorks';
import StorageFAQ from '@/components/storage/StorageFAQ';

const Storage = () => {
  const [activeTab, setActiveTab] = useState('plans');
  
  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <StorageHeader />
          
          <Tabs defaultValue="plans" className="max-w-5xl mx-auto" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="plans">Storage Plans</TabsTrigger>
              <TabsTrigger value="how">How It Works</TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="plans" className="pt-4">
              <StoragePlans />
            </TabsContent>
            
            <TabsContent value="how">
              <StorageHowItWorks onViewPlans={() => setActiveTab('plans')} />
            </TabsContent>
            
            <TabsContent value="faq">
              <StorageFAQ />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Storage;
