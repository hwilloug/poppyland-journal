import React from 'react';
import SideBarComponent from '../components/SideBar';
import { PageContainer, PageContentContainer } from '../components/styled-components';
import { SubHeader } from '../components/styled-components';

const PreviousEntriesPage: React.FunctionComponent = () => {
    return (
        <PageContainer>
            <SideBarComponent />
            <PageContentContainer>
                <SubHeader>Previous Entries</SubHeader>
            </PageContentContainer>
        </PageContainer>
    )
  
}
  
export default PreviousEntriesPage