import { memo } from 'react';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/PageLayout';
import IssuesContainer from '../../containers/IssuesContainer';
import IssuesFilter from '../../containers/IssuesFilter';

function Main() {
  return (
    <>
      <PageLayout>
        <Navigation />
        <IssuesFilter />
        <IssuesContainer />
      </PageLayout>
    </>
  );
}

export default memo(Main);
