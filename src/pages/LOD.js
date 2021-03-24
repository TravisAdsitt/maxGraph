/**
 * Copyright (c) 2006-2013, JGraph Ltd
  
  Level of detail example for mxGraph. This example demonstrates
  implementing a level of detail per cell.
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
        <h1>Level of detail example for mxGraph</h1>

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
        // Creates the graph inside the given container
        let graph = new mxGraph(container);
        graph.centerZoom = false;

        // Links level of detail to zoom level but can be independent of zoom
        graph.isCellVisible = function(cell)
        {
          return cell.lod == null || cell.lod / 2 < this.view.scale;
        };

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        let parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try
        {
          var v1 = graph.insertVertex(parent, null, '1', 20, 20, 80, 30);
          v1.lod = 1;
          var v2 = graph.insertVertex(parent, null, '1', 200, 150, 80, 30);
          v2.lod = 1;
          var v3 = graph.insertVertex(parent, null, '2', 20, 150, 40, 20);
          v3.lod = 2;
          var v4 = graph.insertVertex(parent, null, '3', 200, 10, 20, 20);
          v4.lod = 3;
          var e1 = graph.insertEdge(parent, null, '2', v1, v2, 'strokeWidth=2');
          e1.lod = 2;
          var e2 = graph.insertEdge(parent, null, '2', v3, v4, 'strokeWidth=2');
          e2.lod = 2;
          var e2 = graph.insertEdge(parent, null, '3', v1, v4, 'strokeWidth=1');
          e2.lod = 3;
        }
        finally
        {
          // Updates the display
          graph.getModel().endUpdate();
        }

        document.body.appendChild(mxUtils.button('+', function()
        {
          graph.zoomIn();
        }));

        document.body.appendChild(mxUtils.button('-', function()
        {
          graph.zoomOut();
        }));
      }
    };
  </script>
</head>

<!-- Page passes the container for the graph to the program -->
<body onload="main(document.getElementById('graphContainer'))">

  <!-- Creates a container for the graph with a grid wallpaper -->
  <div id="graphContainer"
    style="position:relative;overflow:hidden;width:621px;height:441px;background:url('editors/images/grid.gif');cursor:default;">
  </div>
</body>
</html>
