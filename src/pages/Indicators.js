/**
 * Copyright (c) 2006-2013, JGraph Ltd
  
  Indicators example for mxGraph. This example demonstrates the use of
  indicators, which are small subshapes inside a parent shape, typically
  an mxLabel.
 */

import React from 'react';
import mxEvent from '../mxgraph/util/mxEvent';
import mxGraph from '../mxgraph/view/mxGraph';
import mxRubberband from '../mxgraph/handler/mxRubberband';

class MYNAMEHERE extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // A container for the graph
    return (
      <>
        <h1>Indicators example for mxGraph</h1>

        <div
          ref={el => {
            this.el = el;
          }}
          style={{

          }}
        />
      </>
    );
  };

  componentDidMount() {

  };
}

export default MYNAMEHERE;


<html>
<head>
  <title></title>

  <!-- Sets the basepath for the library if not in same directory -->
  <script type="text/javascript">
    mxBasePath = '../src';
  </script>

  <!-- Loads and initializes the library -->
  <script type="text/javascript" src="../src/js/mxClient.js"></script>

  <!-- Example code -->
  <script type="text/javascript">

    // Program starts here. Creates a sample graph in the
    // DOM node with the specified ID. This function is invoked
    // from the onLoad event handler of the document (see below).
    function main(container)
    {
      // Checks if the browser is supported
      if (!mxClient.isBrowserSupported())
      {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
      }
      else
      {
        // Creates the graph inside the given container
        let graph = new mxGraph(container);
        graph.setConnectable(true);
        new mxKeyHandler(graph);

        // Enables moving of vertex labels
        graph.vertexLabelsMovable = true;

        // Creates a style with an indicator
        let style = graph.getStylesheet().getDefaultVertexStyle();

        style[mxConstants.STYLE_SHAPE] = 'label';
        style[mxConstants.STYLE_VERTICAL_ALIGN] = 'bottom';
        style[mxConstants.STYLE_INDICATOR_SHAPE] = 'ellipse';
        style[mxConstants.STYLE_INDICATOR_WIDTH] = 34;
        style[mxConstants.STYLE_INDICATOR_HEIGHT] = 34;
        style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = 'top'; // indicator v-alignment
        style[mxConstants.STYLE_IMAGE_ALIGN] = 'center';
        style[mxConstants.STYLE_INDICATOR_COLOR] = 'green';
        delete style[mxConstants.STYLE_STROKECOLOR]; // transparent
        delete style[mxConstants.STYLE_FILLCOLOR]; // transparent

        // Creates a style with an indicator
        let style = graph.getStylesheet().getDefaultEdgeStyle();

        style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
        style[mxConstants.STYLE_ELBOW] = mxConstants.ELBOW_VERTICAL;
        style[mxConstants.STYLE_ROUNDED] = true;

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        let parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try
        {
          graph.insertVertex(parent, null, 'Bottom Label', 80, 80, 80, 60);
          graph.insertVertex(parent, null, 'Top Label', 200, 80, 60, 60,
            'indicatorShape=actor;indicatorWidth=28;indicatorColor=blue;imageVerticalAlign=bottom;verticalAlign=top');
          graph.insertVertex(parent, null, 'Right Label', 300, 80, 120, 60,
            'indicatorShape=cloud;indicatorWidth=40;indicatorColor=#00FFFF;imageVerticalAlign=center;verticalAlign=middle;imageAlign=left;align=left;spacingLeft=44');
        }
        finally
        {
          // Updates the display
          graph.getModel().endUpdate();
        }
      }
    };
  </script>
</head>

<!-- Page passes the container for the graph to the program -->
<body onload="main(document.getElementById('graphContainer'))">

  <!-- Creates a container for the graph with a grid wallpaper -->
  <div id="graphContainer"
    style="position:absolute;top:0px;left:0px;overflow:hidden;width:100%;height:100%;">
  </div>
</body>
</html>
