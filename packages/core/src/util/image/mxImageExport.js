/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 * Updated to ES9 syntax by David Morrissey 2021
 * Type definitions from the typed-mxgraph project
 */

/**
 * Creates a new image export instance to be used with an export canvas. Here
 * is an example that uses this class to create an image via a backend using
 * <mxXmlExportCanvas>.
 *
 * (code)
 * var xmlDoc = mxUtils.createXmlDocument();
 * var root = xmlDoc.createElement('output');
 * xmlDoc.appendChild(root);
 *
 * var xmlCanvas = new mxXmlCanvas2D(root);
 * var imgExport = new mxImageExport();
 * imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);
 *
 * var bounds = graph.getGraphBounds();
 * var w = Math.ceil(bounds.x + bounds.width);
 * var h = Math.ceil(bounds.y + bounds.height);
 *
 * var xml = mxUtils.getXml(root);
 * new mxXmlRequest('export', 'format=png&w=' + w +
 * 		'&h=' + h + '&bg=#F9F7ED&xml=' + encodeURIComponent(xml))
 * 		.simulate(document, '_blank');
 * (end)
 *
 * @class mxImageExport
 */
class mxImageExport {
  constructor() {}

  /**
   * Specifies if overlays should be included in the export. Default is false.
   */
  // includeOverlays: boolean;
  includeOverlays = false;

  /**
   * Draws the given state and all its descendants to the given canvas.
   */
  // drawState(state: mxCellState, canvas: mxAbstractCanvas2D): void;
  drawState(state, canvas) {
    if (state != null) {
      this.visitStatesRecursive(state, canvas, () => {
        this.drawCellState(state, canvas);
      });

      // Paints the overlays
      if (this.includeOverlays) {
        this.visitStatesRecursive(state, canvas, () => {
          this.drawOverlays(state, canvas);
        });
      }
    }
  }

  /**
   * Function: visitStatesRecursive
   *
   * Visits the given state and all its descendants to the given canvas recursively.
   */
  visitStatesRecursive(state, canvas, visitor) {
    if (state != null) {
      visitor(state, canvas);

      const { graph } = state.view;
      const childCount = graph.model.getChildCount(state.cell);

      for (let i = 0; i < childCount; i += 1) {
        const childState = graph.view.getState(
          graph.model.getChildAt(state.cell, i)
        );
        this.visitStatesRecursive(childState, canvas, visitor);
      }
    }
  }

  /**
   * Returns the link for the given cell state and canvas. This returns null.
   */
  // getLinkForCellState(state: mxCellState, canvas: mxAbstractCanvas2D): any;
  getLinkForCellState(state, canvas) {
    return null;
  }

  /**
   * Draws the given state to the given canvas.
   */
  // drawCellState(state: mxCellState, canvas: mxAbstractCanvas2D): void;
  drawCellState(state, canvas) {
    // Experimental feature
    const link = this.getLinkForCellState(state, canvas);

    if (link != null) {
      canvas.setLink(link);
    }

    // Paints the shape and text
    this.drawShape(state, canvas);
    this.drawText(state, canvas);

    if (link != null) {
      canvas.setLink(null);
    }
  }

  /**
   * Function: drawShape
   *
   * Draws the shape of the given state.
   */
  // drawShape(state: mxCellState, canvas: mxAbstractCanvas2D): void;
  drawShape(state, canvas) {
    if (state.shape instanceof mxShape && state.shape.checkBounds()) {
      canvas.save();

      state.shape.beforePaint(canvas);
      state.shape.paint(canvas);
      state.shape.afterPaint(canvas);

      canvas.restore();
    }
  }

  /**
   * Draws the text of the given state.
   */
  // drawText(state: mxCellState, canvas: mxAbstractCanvas2D): void;
  drawText(state, canvas) {
    if (state.text != null && state.text.checkBounds()) {
      canvas.save();

      state.text.beforePaint(canvas);
      state.text.paint(canvas);
      state.text.afterPaint(canvas);

      canvas.restore();
    }
  }

  /**
   * Function: drawOverlays
   *
   * Draws the overlays for the given state. This is called if <includeOverlays>
   * is true.
   */
  // drawOverlays(state: mxCellState, canvas: mxAbstractCanvas2D): void;
  drawOverlays(state, canvas) {
    if (state.overlays != null) {
      state.overlays.visit((id, shape) => {
        if (shape instanceof mxShape) {
          shape.paint(canvas);
        }
      });
    }
  }
}

export default mxImageExport;