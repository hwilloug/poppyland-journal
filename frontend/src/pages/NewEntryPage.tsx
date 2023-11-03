import React from 'react';
import SideBarComponent from '../components/SideBar';
import { PageContainer, PageContentContainer } from '../components/styled-components';
import { SubHeader } from '../components/styled-components';

const NewEntryPage: React.FunctionComponent = () => {
    return (
        <PageContainer>
            <SideBarComponent />
            <PageContentContainer>
                <SubHeader>New Entry</SubHeader>
            </PageContentContainer>
        </PageContainer>
    )
  
}
  
export default NewEntryPage