import React from 'react';
import './page_loader.scss';

const PageLoader = () => {
  return (
    <div className='cmn_full_loader'>
      <div className='container'>
        <img className='loading_icon' src='../../../../../img/loading.svg'/>
      </div>
      <span className='_align'/>
    </div>
  )
};

export default PageLoader;