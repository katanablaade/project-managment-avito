import { memo } from 'react';
import PageLayout from '../../components/PageLayout';
import Navigation from '../../containers/navigation';
import BoardsContainer from '../../containers/BoardsContainer';

function Boards() {
  return (
    <>
      <PageLayout>
        <Navigation />
        <BoardsContainer />
      </PageLayout>
    </>
  );
}

export default memo(Boards);
