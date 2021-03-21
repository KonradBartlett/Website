import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { TabView, TabPanel } from 'primereact/tabview';
import { Reviews } from './Reviews';
import { Metadata } from './Metadata';
import { MetaAnalysis } from './MetaAnalysis';
import { Dashboard } from './Dashboard';

export const Game = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                        <TabPanel header="Dashboard">
                            <Dashboard />
                        </TabPanel>
                        <TabPanel header="Reviews">
                            <Reviews />
                        </TabPanel>
                        <TabPanel header="Metadata">
                            <Metadata />
                        </TabPanel>
                        <TabPanel header="Meta Analysis">
                            <MetaAnalysis />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    );
}