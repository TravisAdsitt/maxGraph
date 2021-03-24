/**
 * Copyright (c) 2006-2013, JGraph Ltd
  
  Layers example for mxGraph. This example demonstrates using
  multiple layers to contain cells.
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
        <h1>Layers example for mxGraph</h1>

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
        // Creates the graph inside the given container using a model
        // with a custom root and two layers. Layers can also be added
        // dynamically using let layer = model.add(root, new mxCell()).
        let root = new mxCell();
        var layer0 = root.insert(new mxCell());
        var layer1 = root.insert(new mxCell());
        let model = new mxGraphModel(root);

        let graph = new mxGraph(container, model);

        // Disables basic selection and cell handling
        graph.setEnabled(false);

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        let parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        model.beginUpdate();
        try
        {
          var v1 = graph.insertVertex(layer1, null, 'Hello,', 20, 20, 80, 30, 'fillColor=#C0C0C0');
          var v2 = graph.insertVertex(layer1, null, 'Hello,', 200, 20, 80, 30, 'fillColor=#C0C0C0');
          var v3 = graph.insertVertex(layer0, null, 'World!', 110, 150, 80, 30);
          var e1 = graph.insertEdge(layer1, null, '', v1, v3, 'strokeColor=#0C0C0C');
          e1.geometry.points = [new mxPoint(60, 165)];
          var e2 = graph.insertEdge(layer0, null, '', v2, v3);
          e2.geometry.points = [new mxPoint(240, 165)];
          var e3 = graph.insertEdge(layer0, null, '', v1, v2,
              'edgeStyle=topToBottomEdgeStyle');
          e3.geometry.points = [new mxPoint(150, 30)];
          var e4 = graph.insertEdge(layer1, null, '', v2, v1,
              'strokeColor=#0C0C0C;edgeStyle=topToBottomEdgeStyle');
          e4.geometry.points = [new mxPoint(150, 40)];
        }
        finally
        {
          // Updates the display
          model.endUpdate();
        }

        document.body.appendChild(mxUtils.button('Layer 0', function()
        {
          model.setVisible(layer0, !model.isVisible(layer0));
        }));

        document.body.appendChild(mxUtils.button('Layer 1', function()
        {
          model.setVisible(layer1, !model.isVisible(layer1));
        }));
      }
    };
  </script>
</head>

<!-- Page passes the container for the graph to the program -->
<body onload="main(document.getElementById('graphContainer'))">

  <!-- Creates a container for the graph with a grid wallpaper -->
  <div id="graphContainer"
    style="overflow:hidden;position:relative;width:321px;height:241px;background:url('editors/images/grid.gif')">
  </div>
</body>
</html>
