//------------------------------------------------------------------------------
// Author: Shenouda Bertel <shenoudab@mobiThought.com>
// Date: 13.03.2018
//------------------------------------------------------------------------------

import React from 'react';
import { Col, Alert } from 'reactstrap';
import DirectionsIcon from 'react-icons/lib/md/directions';

export default function WrongRoute(props) {
  return (
    <Col>
      <div align='center'>
        <DirectionsIcon size={200} color='DimGrey'/>
        <h3>Its 404 Wrong Route.</h3>
        <Alert color="light">
          <a href="/" className="alert-link">Readable Home</a>.
        </Alert>
      </div>
    </Col>
  );
}
