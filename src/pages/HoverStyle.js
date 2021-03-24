/**
 * Copyright (c) 2006-2013, JGraph Ltd
  
  Hoverstyle example for mxGraph. This example shows hot to change
  the style of a vertex on mouseover.
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
        <h1>Hoverstyle example for mxGraph</h1>

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

        function updateStyle(state, hover)
        {
          if (hover)
          {
            state.style[mxConstants.STYLE_FILLCOLOR] = '#ff0000';
          }

          // Sets rounded style for both cases since the rounded style
          // is not set in the default style and is therefore inherited
          // once it is set, whereas the above overrides the default value
          state.style[mxConstants.STYLE_ROUNDED] = (hover) ? '1' : '0';
          state.style[mxConstants.STYLE_STROKEWIDTH] = (hover) ? '4' : '1';
          state.style[mxConstants.STYLE_FONTSTYLE] = (hover) ? mxConstants.FONT_BOLD : '0';
        };

        // Changes fill color to red on mouseover
        graph.addMouseListener(
        {
            currentState: null,
            previousStyle: null,
            mouseDown: function(sender, me)
            {
                if (this.currentState != null)
                {
                  this.dragLeave(me.getEvent(), this.currentState);
                  this.currentState = null;
                }
            },
            mouseMove: function(sender, me)
            {
                if (this.currentState != null && me.getState() == this.currentState)
                {
                    return;
                }

                let tmp = graph.view.getState(me.getCell());

                // Ignores everything but vertices
                if (graph.isMouseDown || (tmp != null && !
                    graph.getModel().isVertex(tmp.cell)))
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
                if (state != null)
                {
                  this.previousStyle = state.style;
                  state.style = mxUtils.clone(state.style);
                  updateStyle(state, true);
                  state.shape.apply(state);
                  state.shape.redraw();

                  if (state.text != null)
                  {
                    state.text.apply(state);
                    state.text.redraw();
                  }
                }
            },
            dragLeave: function(evt, state)
            {
                if (state != null)
                {
                  state.style = this.previousStyle;
                  updateStyle(state, false);
                  state.shape.apply(state);
                  state.shape.redraw();

                  if (state.text != null)
                  {
                    state.text.apply(state);
                    state.text.redraw();
                  }
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
    style="position:relative;overflow:hidden;width:321px;height:241px;background:url('editors/images/grid.gif');cursor:default;">
  </div>
</body>
</html>
