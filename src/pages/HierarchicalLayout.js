/**
 * Copyright (c) 2006-2013, JGraph Ltd
  
  Hierarchical Layout example for mxGraph. This example demonstrates the
  use of the hierarchical and organic layouts. Note that the hierarchical
  layout requires another script tag in the head of the page.
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
        <h1>Hierarchical Layout example for mxGraph</h1>

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
      // Checks if browser is supported
      if (!mxClient.isBrowserSupported())
      {
        // Displays an error message if the browser is
        // not supported.
        mxUtils.error('Browser is not supported!', 200, false);
      }
      else
      {
        // Creates the graph inside the given container
        let graph = new mxGraph(container);

        // Adds rubberband selection
        new mxRubberband(graph);

        // Changes the default vertex style in-place
        let style = graph.getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
        style[mxConstants.STYLE_PERIMETER_SPACING] = 6;
        style[mxConstants.STYLE_ROUNDED] = true;
        style[mxConstants.STYLE_SHADOW] = true;

        style = graph.getStylesheet().getDefaultEdgeStyle();
        style[mxConstants.STYLE_ROUNDED] = true;

        // Creates a layout algorithm to be used
        // with the graph
        let layout = new mxHierarchicalLayout(graph);
        let organic = new mxFastOrganicLayout(graph);
        organic.forceConstant = 120;

        let parent = graph.getDefaultParent();

        // Adds a button to execute the layout
        let button = document.createElement('button');
        mxUtils.write(button, 'Hierarchical');
        mxEvent.addListener(button, 'click', function(evt)
        {
          layout.execute(parent);
        });
        document.body.appendChild(button);

        // Adds a button to execute the layout
        let button = document.createElement('button');
        mxUtils.write(button, 'Organic');

        mxEvent.addListener(button, 'click', function(evt)
        {
          organic.execute(parent);
        });

        document.body.appendChild(button);

        // Load cells and layouts the graph
        graph.getModel().beginUpdate();
        try
        {
          var v1 = graph.insertVertex(parent, null, '1', 0, 0, 80, 30);
          var v2 = graph.insertVertex(parent, null, '2', 0, 0, 80, 30);
          var v3 = graph.insertVertex(parent, null, '3', 0, 0, 80, 30);
          var v4 = graph.insertVertex(parent, null, '4', 0, 0, 80, 30);
          var v5 = graph.insertVertex(parent, null, '5', 0, 0, 80, 30);
          var v6 = graph.insertVertex(parent, null, '6', 0, 0, 80, 30);
          var v7 = graph.insertVertex(parent, null, '7', 0, 0, 80, 30);
          var v8 = graph.insertVertex(parent, null, '8', 0, 0, 80, 30);
          var v9 = graph.insertVertex(parent, null, '9', 0, 0, 80, 30);

          var e1 = graph.insertEdge(parent, null, '', v1, v2);
          var e2 = graph.insertEdge(parent, null, '', v1, v3);
          var e3 = graph.insertEdge(parent, null, '', v3, v4);
          var e4 = graph.insertEdge(parent, null, '', v2, v5);
          var e5 = graph.insertEdge(parent, null, '', v1, v6);
          var e6 = graph.insertEdge(parent, null, '', v2, v3);
          var e7 = graph.insertEdge(parent, null, '', v6, v4);
          var e8 = graph.insertEdge(parent, null, '', v6, v1);
          var e9 = graph.insertEdge(parent, null, '', v6, v7);
          var e10 = graph.insertEdge(parent, null, '', v7, v8);
          var e11 = graph.insertEdge(parent, null, '', v7, v9);
          var e12 = graph.insertEdge(parent, null, '', v7, v6);
          var e13 = graph.insertEdge(parent, null, '', v7, v5);

          // Executes the layout
          layout.execute(parent);
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
<body onload="main(document.getElementById('graphContainer'))" style="margin:4px;">

  <!-- Creates a container for the graph with a grid wallpaper. Make sure to define the position
    and overflow attributes! See comments on the adding of the size-listener on line 54 ff!  -->
  <div id="graphContainer"
    style="position:absolute;overflow:auto;top:36px;bottom:0px;left:0px;right:0px;border-top:gray 1px solid;">
  </div>
</body>
</html>
