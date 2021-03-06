import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useOktaAuth } from '@okta/okta-react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { SizeMe } from 'react-sizeme';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { markAsRead } from '../../../api';
import { tasks } from '../../../state/actions';

const StoryViewer = props => {
  const { authState } = useOktaAuth();
  const { push } = useHistory();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasViewedAllPages, setViewed] = useState(false);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const previousPage = () => {
    if (pageNumber > 1) {
      changePage(-1);
    }
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      changePage(1);
    }
  };

  const keydownListener = useCallback(
    event => {
      if (event.keyCode === 37) {
        previousPage();
      }
      if (event.keyCode === 39) {
        nextPage();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [previousPage, nextPage, numPages]
  );

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = offset => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const onFinish = e => {
    markAsRead(authState, props.tasks.id);
    push('/child/mission-control');
    props.setHasRead();
  };

  useEffect(() => {
    if (pageNumber === numPages) {
      setViewed(true);
    }
  }, [pageNumber, numPages]);

  useEffect(() => {
    document.addEventListener('keydown', keydownListener);
    return () => {
      document.removeEventListener('keydown', keydownListener);
    };
  }, [keydownListener]);

  return (
    <>
      <div className="viewer-container">
        <SizeMe>
          {({ size }) => (
            <Document
              file={props.tasks.story.storyUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading="Loading Story..."
            >
              <div className="page-container">
                <Page
                  className="page-component"
                  width={size.width ? size.width : 1}
                  pageNumber={pageNumber}
                />
              </div>
            </Document>
          )}
        </SizeMe>
        <div className="content-box center-content">
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button
            className="small"
            type="primary"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            size="large"
          >
            <ArrowLeftOutlined />
          </button>
          <button
            className="small"
            type="primary"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            size="large"
          >
            <ArrowRightOutlined />
          </button>
          <br />
          <button
            className="small"
            type="button"
            disabled={!hasViewedAllPages}
            onClick={onFinish}
          >
            I'm awesome, I'm done reading!
          </button>
        </div>
      </div>
    </>
  );
};

export default connect(
  state => ({
    child: state.child,
    tasks: state.tasks,
  }),
  {
    setHasRead: tasks.setHasRead,
    setSubmissionInformation: tasks.setSubmissionInformation,
  }
)(StoryViewer);
