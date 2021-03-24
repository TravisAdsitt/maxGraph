/**
 * Copyright (c) 2006-2013, JGraph Ltd
  
  Groups example for mxGraph. This example demonstrates using
  cells as parts of other cells.
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
        <h1>Hello, World! example for mxGraph</h1>

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


    // Overrides check for valid roots
    mxGraph.prototype.isValidRoot = function()
    {
      return false;
    };

    // Don't clear selection if multiple cells selected
    let graphHandlerMouseDown = mxGraphHandler.prototype.mouseDown;
    mxGraphHandler.prototype.mouseDown = function(sender, me)
    {
      graphHandlerMouseDown.apply(this, arguments);

      if (this.graph.isCellSelected(me.getCell()) && this.graph.getSelectionCount() > 1)
      {
        this.delayedSelection = false;
      }
    };

    // Selects descendants before children selection mode
    let graphHandlerGetInitialCellForEvent = mxGraphHandler.prototype.getInitialCellForEvent;
    mxGraphHandler.prototype.getInitialCellForEvent = function(me)
    {
      let model = this.graph.getModel();
      let psel = model.getParent(this.graph.getSelectionCell());
      let cell = graphHandlerGetInitialCellForEvent.apply(this, arguments);
      let parent = model.getParent(cell);

      if (psel == null || (psel != cell && psel != parent))
      {
        while (!this.graph.isCellSelected(cell) && !this.graph.isCellSelected(parent) &&
            model.isVertex(parent) && !this.graph.isValidRoot(parent))
        {
          cell = parent;
          parent = this.graph.getModel().getParent(cell);
        }
      }

      return cell;
    };

    // Selection is delayed to mouseup if child selected
    let graphHandlerIsDelayedSelection = mxGraphHandler.prototype.isDelayedSelection;
    mxGraphHandler.prototype.isDelayedSelection = function(cell)
    {
      let result = graphHandlerIsDelayedSelection.apply(this, arguments);
      let model = this.graph.getModel();
      let psel = model.getParent(this.graph.getSelectionCell());
      let parent = model.getParent(cell);

      if (psel == null || (psel != cell && psel != parent))
      {
        if (!this.graph.isCellSelected(cell) && model.isVertex(parent) && !this.graph.isValidRoot(parent))
        {
          result = true;
        }
      }

      return result;
    };

    // Delayed selection of parent group
    mxGraphHandler.prototype.selectDelayed = function(me)
    {
      let cell = me.getCell();

      if (cell == null)
      {
        cell = this.cell;
      }

      let model = this.graph.getModel();
      let parent = model.getParent(cell);

      while (this.graph.isCellSelected(cell) && model.isVertex(parent) && !this.graph.isValidRoot(parent))
      {
        cell = parent;
        parent = model.getParent(cell);
      }

      this.graph.selectCellForEvent(cell, me.getEvent());
    };

    // Returns last selected ancestor
    mxPopupMenuHandler.prototype.getCellForPopupEvent = function(me)
    {
      let cell = me.getCell();
      let model = this.graph.getModel();
      let parent = model.getParent(cell);

      while (model.isVertex(parent) && !this.graph.isValidRoot(parent))
      {
        if (this.graph.isCellSelected(parent))
        {
          cell = parent;
        }

        parent = model.getParent(parent);
      }

      return cell;
    };

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
        graph.constrainChildren = false;
        graph.extendParents = false;
        graph.extendParentsOnAdd = false;

        // Uncomment the following if you want the container
        // to fit the size of the graph
        //graph.setResizeContainer(true);

        // Enables rubberband selection
        new mxRubberband(graph);

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        let parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try
        {
          var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 120, 60);
          var v2 = graph.insertVertex(v1, null, 'World!', 90, 20, 60, 20);
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
    style="overflow:hidden;width:321px;height:241px;background:url('editors/images/grid.gif');cursor:default;">
  </div>
</body>
</html>
