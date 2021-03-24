/**
 * Copyright (c) 2006-2013, JGraph Ltd
  
  Guides example for mxGraph. This example demonstrates the guides
  feature which aligns the current selection to the existing vertices
  in the graph. This feature is in RFC state. Creating a grid using
  a canvas and installing a key handler for cursor keys is also
  demonstrated here, as well as snapping waypoints to terminals.
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
        <h1>Guides example for mxGraph</h1>

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
        // Enables guides
        mxGraphHandler.prototype.guidesEnabled = true;

          // Alt disables guides
          mxGraphHandler.prototype.useGuidesForEvent = function(me)
          {
            return !mxEvent.isAltDown(me.getEvent());
          };

          // Defines the guides to be red (default)
        mxConstants.GUIDE_COLOR = '#FF0000';

          // Defines the guides to be 1 pixel (default)
        mxConstants.GUIDE_STROKEWIDTH = 1;

        // Enables snapping waypoints to terminals
        mxEdgeHandler.prototype.snapToTerminals = true;

        // Creates the graph inside the given container
        let graph = new mxGraph(container);
        graph.setConnectable(true);
        graph.gridSize = 30;

        // Changes the default style for edges "in-place" and assigns
        // an alternate edge style which is applied in mxGraph.flip
        // when the user double clicks on the adjustment control point
        // of the edge. The ElbowConnector edge style switches to TopToBottom
        // if the horizontal style is true.
        let style = graph.getStylesheet().getDefaultEdgeStyle();
        style[mxConstants.STYLE_ROUNDED] = true;
        style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
        graph.alternateEdgeStyle = 'elbow=vertical';

        // Enables rubberband selection
        new mxRubberband(graph);

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        let parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        var v1;
        try
        {
          v1 = graph.insertVertex(parent, null, 'Hello,', 20, 40, 80, 70);
          var v2 = graph.insertVertex(parent, null, 'World!', 200, 140, 80, 40);
          var e1 = graph.insertEdge(parent, null, '', v1, v2);
        }
        finally
        {
          // Updates the display
          graph.getModel().endUpdate();
        }

          // Handles cursor keys
          let nudge = function(keyCode)
          {
            if (!graph.isSelectionEmpty())
          {
              let dx = 0;
              let dy = 0;

              if (keyCode == 37)
            {
                dx = -1;
            }
              else if (keyCode == 38)
              {
                dy = -1;
              }
              else if (keyCode == 39)
              {
                dx = 1;
              }
              else if (keyCode == 40)
              {
                dy = 1;
              }

              graph.moveCells(graph.getSelectionCells(), dx, dy);
          }
          };

        // Transfer initial focus to graph container for keystroke handling
        graph.container.focus();

          // Handles keystroke events
          let keyHandler = new mxKeyHandler(graph);

          // Ignores enter keystroke. Remove this line if you want the
          // enter keystroke to stop editing
          keyHandler.enter = function() {};

          keyHandler.bindKey(37, function()
        {
          nudge(37);
        });

          keyHandler.bindKey(38, function()
          {
            nudge(38);
          });

          keyHandler.bindKey(39, function()
          {
            nudge(39);
          });

          keyHandler.bindKey(40, function()
          {
            nudge(40);
          });
      }
    };
  </script>
</head>

<!-- Page passes the container for the graph to the program -->
<body onload="main(document.getElementById('graphContainer'))">

  <!-- Creates a container for the graph with a grid wallpaper -->
  <div id="graphContainer"
    style="overflow:hidden;width:801px;height:601px;background:url('editors/images/grid.gif');cursor:default;">
  </div>
</body>
</html>
