/**
 * Copyright (c) 2006-2013, JGraph Ltd
 *
 * Dynamic toolbar example for mxGraph. This example demonstrates changing the
 * state of the toolbar at runtime.
 */

import React from 'react';
import mxEvent from '../mxgraph/util/mxEvent';
import mxGraph from '../mxgraph/view/mxGraph';
import mxRubberband from '../mxgraph/handler/mxRubberband';
import mxUtils from '../mxgraph/util/mxUtils';
import mxConnectionHandler from '../mxgraph/handler/mxConnectionHandler';
import mxImage from '../mxgraph/util/mxImage';
import mxToolbar from '../mxgraph/util/mxToolbar';
import mxGraphModel from '../mxgraph/model/mxGraphModel';
import mxCell from '../mxgraph/model/mxCell';
import mxGeometry from '../mxgraph/model/mxGeometry';
import mxKeyHandler from '../mxgraph/handler/mxKeyHandler';

class DynamicToolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // A container for the graph
    return (
      <>
        <h1>Toolbar example for mxGraph</h1>

        <div
          ref={el => {
            this.el = el;
          }}
          style={{
            overflow: 'hidden',
            width: '321px',
            height: '241px',
            background: "url('editors/images/grid.gif')",
            position: "relative"
          }}
        />
      </>
    );
  }

  componentDidMount() {
    // Defines an icon for creating new connections in the connection handler.
    // This will automatically disable the highlighting of the source vertex.
    mxConnectionHandler.prototype.connectImage = new mxImage(
      'images/connector.gif',
      16,
      16
    );

    // Creates the div for the toolbar
    const tbContainer = document.createElement('div');
    tbContainer.style.position = 'absolute';
    tbContainer.style.overflow = 'hidden';
    tbContainer.style.padding = '2px';
    tbContainer.style.left = '0px';
    tbContainer.style.top = '0px';
    tbContainer.style.width = '24px';
    tbContainer.style.bottom = '0px';

    this.el.appendChild(tbContainer);

    // Creates new toolbar without event processing
    const toolbar = new mxToolbar(tbContainer);
    toolbar.enabled = false;

    // Creates the div for the graph
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.overflow = 'hidden';
    container.style.left = '24px';
    container.style.top = '0px';
    container.style.right = '0px';
    container.style.bottom = '0px';
    container.style.background = 'url("editors/images/grid.gif")';

    this.el.appendChild(container);

    // Creates the model and the graph inside the container
    // using the fastest rendering available on the browser
    const model = new mxGraphModel();
    const graph = new mxGraph(container, model);

    // Enables new connections in the graph
    graph.setConnectable(true);
    graph.setMultigraph(false);

    // Stops editing on enter or escape keypress
    const keyHandler = new mxKeyHandler(graph);
    const rubberband = new mxRubberband(graph);

    const addVertex = (icon, w, h, style) => {
      const vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
      vertex.setVertex(true);

      const img = this.addToolbarItem(graph, toolbar, vertex, icon);
      img.enabled = true;

      graph.getSelectionModel().addListener(mxEvent.CHANGE, function() {
        const tmp = graph.isSelectionEmpty();
        mxUtils.setOpacity(img, tmp ? 100 : 20);
        img.enabled = tmp;
      });
    };

    addVertex('editors/images/rectangle.gif', 100, 40, '');
    addVertex('editors/images/rounded.gif', 100, 40, 'shape=rounded');
    addVertex('editors/images/ellipse.gif', 40, 40, 'shape=ellipse');
    addVertex('editors/images/rhombus.gif', 40, 40, 'shape=rhombus');
    addVertex('editors/images/triangle.gif', 40, 40, 'shape=triangle');
    addVertex('editors/images/cylinder.gif', 40, 40, 'shape=cylinder');
    addVertex('editors/images/actor.gif', 30, 40, 'shape=actor');
  }

  addToolbarItem(graph, toolbar, prototype, image) {
    // Function that is executed when the image is dropped on
    // the graph. The cell argument points to the cell under
    // the mousepointer if there is one.
    const funct = function(graph, evt, cell, x, y) {
      graph.stopEditing(false);

      const vertex = graph.getModel().cloneCell(prototype);
      vertex.geometry.x = x;
      vertex.geometry.y = y;

      graph.addCell(vertex);
      graph.setSelectionCell(vertex);
    };

    // Creates the image which is used as the drag icon (preview)
    const img = toolbar.addMode(null, image, function(evt, cell) {
      const pt = this.graph.getPointForEvent(evt);
      funct(graph, evt, cell, pt.x, pt.y);
    });

    // Disables dragging if element is disabled. This is a workaround
    // for wrong event order in IE. Following is a dummy listener that
    // is invoked as the last listener in IE.
    mxEvent.addListener(img, 'mousedown', function(evt) {
      // do nothing
    });

    // This listener is always called first before any other listener
    // in all browsers.
    mxEvent.addListener(img, 'mousedown', function(evt) {
      if (img.enabled == false) {
        mxEvent.consume(evt);
      }
    });

    mxUtils.makeDraggable(img, graph, funct);

    return img;
  }
}

export default DynamicToolbar;
