/**
 * Copyright (c) 2006-2013, JGraph Ltd
  
  Hello, World! example for mxGraph. This example demonstrates creating
  permissions to define the available operations a the graph.
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
        <h1>Permissions example for mxGraph</h1>

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


    function main()
    {
      // Checks if the browser is supported
      if (!mxClient.isBrowserSupported())
      {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
      }
      else
      {
        // Defines an icon for creating new connections in the connection handler.
        // This will automatically disable the highlighting of the source vertex.
        mxConnectionHandler.prototype.connectImage = new mxImage('images/connector.gif', 16, 16);

        // Creates the div for the graph
        let container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.overflow = 'hidden';
        container.style.left = '00px';
        container.style.top = '40px';
        container.style.right = '0px';
        container.style.bottom = '0px';
        container.style.background = 'url("editors/images/grid.gif")';

        document.body.appendChild(container);

        // Creates the graph inside the given container
        let graph = new mxGraph(container);

        // Enable tooltips, disables mutligraphs, enable loops
        graph.setMultigraph(false);
        graph.setAllowLoops(true);

        // Enables rubberband selection and key handling
        let rubberband = new mxRubberband(graph);
        let keyHandler = new mxKeyHandler(graph);

        // Assigns the delete key
        keyHandler.bindKey(46, function(evt)
        {
          if (graph.isEnabled())
          {
            graph.removeCells();
          }
        });

        // Shared variable between child function scopes
        // aka "private" variable
        let currentPermission = null;

        let apply = function(permission)
        {
          graph.clearSelection();
          permission.apply(graph);
          graph.setEnabled(true);
          graph.setTooltips(true);

          // Updates the icons on the shapes - rarely
          // needed and very slow for large graphs
          graph.refresh();
          currentPermission = permission;
        };

        apply(new Permission());

        let button = mxUtils.button('Allow All', function(evt)
        {
          apply(new Permission());
        });
        document.body.appendChild(button);

        let button = mxUtils.button('Connect Only', function(evt)
        {
          apply(new Permission(false, true, false, false, true));
        });
        document.body.appendChild(button);

        let button = mxUtils.button('Edges Only', function(evt)
        {
          apply(new Permission(false, false, true, false, false));
        });
        document.body.appendChild(button);

        let button = mxUtils.button('Vertices Only', function(evt)
        {
          apply(new Permission(false, false, false, true, false));
        });
        document.body.appendChild(button);

        let button = mxUtils.button('Select Only', function(evt)
        {
          apply(new Permission(false, false, false, false, false));
        });
        document.body.appendChild(button);

        let button = mxUtils.button('Locked', function(evt)
        {
          apply(new Permission(true, false));
        });
        document.body.appendChild(button);

        let button = mxUtils.button('Disabled', function(evt)
        {
          graph.clearSelection();
          graph.setEnabled(false);
          graph.setTooltips(false);
        });
        document.body.appendChild(button);

        // Extends hook functions to use permission object. This could
        // be done by assigning the respective switches (eg.
        // setMovable), but this approach is more flexible, doesn't
        // override any existing behaviour or settings, and allows for
        // dynamic conditions to be used in the functions. See the
        // specification for more functions to extend (eg.
        // isSelectable).
        let oldDisconnectable = graph.isCellDisconnectable;
        graph.isCellDisconnectable = function(cell, terminal, source)
        {
          return oldDisconnectable.apply(this, arguments) &&
            currentPermission.editEdges;
        };

        let oldTerminalPointMovable = graph.isTerminalPointMovable;
        graph.isTerminalPointMovable = function(cell)
        {
          return oldTerminalPointMovable.apply(this, arguments) &&
            currentPermission.editEdges;
        };

        let oldBendable = graph.isCellBendable;
        graph.isCellBendable = function(cell)
        {
          return oldBendable.apply(this, arguments) &&
            currentPermission.editEdges;
        };

        let oldLabelMovable = graph.isLabelMovable;
        graph.isLabelMovable = function(cell)
        {
          return oldLabelMovable.apply(this, arguments) &&
            currentPermission.editEdges;
        };

        let oldMovable = graph.isCellMovable;
        graph.isCellMovable = function(cell)
        {
          return oldMovable.apply(this, arguments) &&
            currentPermission.editVertices;
        };

        let oldResizable = graph.isCellResizable;
        graph.isCellResizable = function(cell)
        {
          return oldResizable.apply(this, arguments) &&
            currentPermission.editVertices;
        };

        let oldEditable = graph.isCellEditable;
        graph.isCellEditable = function(cell)
        {
          return oldEditable.apply(this, arguments) &&
            (this.getModel().isVertex(cell) &&
            currentPermission.editVertices) ||
            (this.getModel().isEdge(cell) &&
            currentPermission.editEdges);
        };

        let oldDeletable = graph.isCellDeletable;
        graph.isCellDeletable = function(cell)
        {
          return oldDeletable.apply(this, arguments) &&
            (this.getModel().isVertex(cell) &&
            currentPermission.editVertices) ||
            (this.getModel().isEdge(cell) &&
            currentPermission.editEdges);
        };

        let oldCloneable = graph.isCellCloneable;
        graph.isCellCloneable = function(cell)
        {
          return oldCloneable.apply(this, arguments) &&
            currentPermission.cloneCells;
        };

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        let parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try
        {
          var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
          var v2 = graph.insertVertex(parent, null, 'Hello,', 200, 20, 80, 30);
          var v3 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
          var e1 = graph.insertEdge(parent, null, 'Connection', v1, v3);
        }
        finally
        {
          // Updates the display
          graph.getModel().endUpdate();
        }
      }
    };

    function Permission(locked, createEdges, editEdges, editVertices, cloneCells)
    {
      this.locked = (locked != null) ? locked : false;
      this.createEdges = (createEdges != null) ? createEdges : true;
      this.editEdges = (editEdges != null) ? editEdges : true;;
      this.editVertices = (editVertices != null) ? editVertices : true;;
      this.cloneCells = (cloneCells != null) ? cloneCells : true;;
    };

    Permission.prototype.apply = function(graph)
    {
      graph.setConnectable(this.createEdges);
      graph.setCellsLocked(this.locked);
    };
  </script>
</head>

<!-- Page passes the container for the graph to the program -->
<body onload="main();">
</body>
</html>
