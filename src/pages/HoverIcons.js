/**
 * Copyright (c) 2006-2013, JGraph Ltd
  
  Hover icons example for mxGraph. This example demonstrates showing
  icons on vertices as mouse hovers over them.
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
        <h1>Hover icons example for mxGraph</h1>

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
    // Defines an icon for creating new connections in the connection handler.
    // This will automatically disable the highlighting of the source vertex.
    mxConnectionHandler.prototype.connectImage = new mxImage('images/connector.gif', 16, 16);

    // Defines a new class for all icons
    function mxIconSet(state)
    {
      this.images = [];
      let graph = state.view.graph;

      // Icon1
      let img = mxUtils.createImage('images/copy.png');
      img.setAttribute('title', 'Duplicate');
      img.style.position = 'absolute';
      img.style.cursor = 'pointer';
      img.style.width = '16px';
      img.style.height = '16px';
      img.style.left = (state.x + state.width) + 'px';
      img.style.top = (state.y + state.height) + 'px';

      mxEvent.addGestureListeners(img,
        (evt) => {
          let s = graph.gridSize;
          graph.setSelectionCells(graph.moveCells([state.cell], s, s, true));
          mxEvent.consume(evt);
          this.destroy();
        })
      );

      state.view.graph.container.appendChild(img);
      this.images.push(img);

      // Delete
      let img = mxUtils.createImage('images/delete2.png');
      img.setAttribute('title', 'Delete');
      img.style.position = 'absolute';
      img.style.cursor = 'pointer';
      img.style.width = '16px';
      img.style.height = '16px';
      img.style.left = (state.x + state.width) + 'px';
      img.style.top = (state.y - 16) + 'px';

      mxEvent.addGestureListeners(img,
        (evt) => {
          // Disables dragging the image
          mxEvent.consume(evt);
        }
      );

      mxEvent.addListener(img, 'click',
        (evt) => {
          graph.removeCells([state.cell]);
          mxEvent.consume(evt);
          this.destroy();
        }
      );

      state.view.graph.container.appendChild(img);
      this.images.push(img);
    };

    mxIconSet.prototype.destroy = function()
    {
      if (this.images != null)
      {
        for (let i = 0; i < this.images.length; i++)
        {
          let img = this.images[i];
          img.parentNode.removeChild(img);
        }
      }

      this.images = null;
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
        graph.setConnectable(true);

        // Defines the tolerance before removing the icons
        let iconTolerance = 20;

        // Shows icons if the mouse is over a cell
        graph.addMouseListener(
        {
            currentState: null,
            currentIconSet: null,
            mouseDown: function(sender, me)
            {
              // Hides icons on mouse down
                if (this.currentState != null)
                {
                    this.dragLeave(me.getEvent(), this.currentState);
                    this.currentState = null;
                }
            },
            mouseMove: function(sender, me)
            {
              if (this.currentState != null && (me.getState() == this.currentState ||
                me.getState() == null))
              {
                let tol = iconTolerance;
                let tmp = new mxRectangle(me.getGraphX() - tol,
                  me.getGraphY() - tol, 2 * tol, 2 * tol);

                if (mxUtils.intersects(tmp, this.currentState))
                {
                  return;
                }
              }

            let tmp = graph.view.getState(me.getCell());

              // Ignores everything but vertices
            if (graph.isMouseDown || (tmp != null && !graph.getModel().isVertex(tmp.cell)))
            {
              tmp = null;
            }

                if (tmp != this.currentState)
                {
                  if (this.currentState != null)
                  {
                      this.dragLeave(me.getEvent(), this.currentState);
                  }

                  this.currentState = tmp;

                  if (this.currentState != null)
                  {
                      this.dragEnter(me.getEvent(), this.currentState);
                  }
                }
            },
            mouseUp: function(sender, me) { },
            dragEnter: function(evt, state)
            {
              if (this.currentIconSet == null)
              {
                this.currentIconSet = new mxIconSet(state);
              }
            },
            dragLeave: function(evt, state)
            {
              if (this.currentIconSet != null)
              {
                this.currentIconSet.destroy();
                this.currentIconSet = null;
              }
            }
        });

        // Enables rubberband selection
        new mxRubberband(graph);

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        let parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try
        {
          var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
          var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
          var e1 = graph.insertEdge(parent, null, '', v1, v2);
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
