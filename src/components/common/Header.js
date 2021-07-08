import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChildHeader from './ChildHeader';
import ParentNavTop from './ParentNavTop';

function Header() {
  const history = useHistory();
  const [header, setHeader] = useState(history.location.pathname);


  useEffect(() => {
    console.log(history.location.pathname);
    setHeader(history.location.pathname);
  }, [history.location.pathname]);

  if (header.includes('/parent')) {
    console.log(window.location.pathname);
    return <ParentNavTop />;
  } else {
    console.log(window.location.pathname);
    return <ChildHeader />;
  }
}

export default Header;
