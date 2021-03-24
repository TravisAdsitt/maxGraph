/**
 * Copyright (c) 2006-2013, JGraph Ltd
  
  Offpage example for mxGraph. This example demonstrates creating
  offpage connectors in a graph and loading a new diagram on a
  single click.
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
        <h1>Offpage connector example for mxGraph</h1>

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


    // Use complete cell as highlight region
    mxConstants.ACTIVE_REGION = 1;

    // Program starts here. Creates a sample graph in the dynamically
    // created DOM node called container which is created below.
    function main()
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
        let container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.overflow = 'hidden';
        container.style.left = '0px';
        container.style.top = '0px';
        container.style.right = '0px';
        container.style.bottom = '0px';
        container.style.background = 'url("editors/images/grid.gif")';

        document.body.appendChild(container);

        // Creates the graph inside the given container
        let graph = new mxGraph(container);
        graph.setEnabled(false);

        // Highlights offpage connectors
        let highlight = new mxCellTracker(graph, null, function(me)
        {
          let cell = me.getCell();

          if (cell != null &&
            cell.value != null &&
            typeof(cell.value.create) == 'function')
          {
            return cell;
          }

          return null;
        });

        // Handles clicks on offpage connectors and
        // executes function in user object
        graph.addListener(mxEvent.CLICK, function(source, evt)
        {
          let cell = evt.getProperty('cell');

          if (cell != null &&
            cell.value != null &&
            typeof(cell.value.create) == 'function')
          {
            cell.value.create();
          }
        });

        // Handles clicks on offpage connectors and
        // executes function in user object
        graph.getCursorForCell = function(cell)
        {
          if (cell != null &&
            cell.value != null &&
            typeof(cell.value.create) == 'function')
          {
            return 'pointer';
          }
        };

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        let first = null;
        let second = null;

        first = function()
        {
          let value = {toString: function() { return 'Next'; }, create: second};

          // Adds cells to the model in a single step
          graph.getModel().beginUpdate();
          try
          {
            graph.getModel().setRoot(graph.getModel().createRoot());
            let parent = graph.getDefaultParent();

            var v1 = graph.insertVertex(parent, null, 'Click', 30, 20, 80, 30, 'fillColor=#FFFF88;strokeColor=#FF1A00');
            var v2 = graph.insertVertex(parent, null, 'Next', 20, 150, 100, 30, 'fillColor=#FFFF88;strokeColor=#FF1A00');
            var v3 = graph.insertVertex(parent, null, value, 200, 150, 40, 40, 'shape=triangle;align=left;fillColor=#C3D9FF;strokeColor=#4096EE');
            var e1 = graph.insertEdge(parent, null, null, v1, v2, 'strokeColor=#FF1A00');
          }
          finally
          {
            // Updates the display
            graph.getModel().endUpdate();
          }
        };

        second = function()
        {
          let value = {toString: function() { return 'Prev'; }, create: first};

          // Adds cells to the model in a single step
          graph.getModel().beginUpdate();
          try
          {
            graph.getModel().setRoot(graph.getModel().createRoot());
            let parent = graph.getDefaultParent();

            var v1 = graph.insertVertex(parent, null, 'Click', 30, 20, 80, 30, 'fillColor=#CDEB8B;strokeColor=#008C00');
            var v2 = graph.insertVertex(parent, null, 'Prev', 220, 20, 100, 30, 'fillColor=#CDEB8B;strokeColor=#008C00');
            var v3 = graph.insertVertex(parent, null, value, 30, 150, 40, 40, 'shape=triangle;align=right;fillColor=#C3D9FF;strokeColor=#4096EE;direction=west');
            var e1 = graph.insertEdge(parent, null, null, v1, v2, 'strokeColor=#008C00');
          }
          finally
          {
            // Updates the display
            graph.getModel().endUpdate();
          }
        };

        first();
      }
    };
  </script>
</head>

<!-- Calls the main function after the page has loaded. Container is dynamically created. -->
<body onload="main();">
</body>
</html>
