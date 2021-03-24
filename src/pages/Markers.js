/**
 * Copyright (c) 2006-2013, JGraph Ltd
  
  Markers example for mxGraph. This example demonstrates creating
  custom markers and customizing the built-in markers.
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
        <h1>Markers example for mxGraph</h1>

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
        mxEdgeHandler.prototype.snapToTerminals = true;

        // Registers and defines the custom marker
        mxMarker.addMarker('dash', function(canvas, shape, type, pe, unitX, unitY, size, source, sw, filled)
        {
          let nx = unitX * (size + sw + 1);
          let ny = unitY * (size + sw + 1);

          return function()
          {
            canvas.begin();
            canvas.moveTo(pe.x - nx / 2 - ny / 2, pe.y - ny / 2 + nx / 2);
            canvas.lineTo(pe.x + ny / 2 - 3 * nx / 2, pe.y - 3 * ny / 2 - nx / 2);
            canvas.stroke();
          };
        });

        // Defines custom message shape
        function MessageShape()
        {
          mxCylinder.call(this);
        };
        mxUtils.extend(MessageShape, mxCylinder);
        MessageShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
        {
          if (isForeground)
          {
            path.moveTo(0, 0);
            path.lineTo(w / 2, h / 2);
            path.lineTo(w, 0);
          }
          else
          {
            path.moveTo(0, 0);
            path.lineTo(w, 0);
            path.lineTo(w, h);
            path.lineTo(0, h);
            path.close();
          }
        };

        // Registers the message shape
        mxCellRenderer.registerShape('message', MessageShape);

        // Defines custom edge shape
        function LinkShape()
        {
          mxArrow.call(this);
        };
        mxUtils.extend(LinkShape, mxArrow);
        LinkShape.prototype.paintEdgeShape = function(c, pts)
        {
          let width = 10;

          // Base vector (between end points)
          var p0 = pts[0];
          let pe = pts[pts.length - 1];

          let dx = pe.x - p0.x;
          let dy = pe.y - p0.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          let length = dist;

          // Computes the norm and the inverse norm
          let nx = dx / dist;
          let ny = dy / dist;
          let basex = length * nx;
          let basey = length * ny;
          let floorx = width * ny/3;
          let floory = -width * nx/3;

          // Computes points
          var p0x = p0.x - floorx / 2;
          var p0y = p0.y - floory / 2;
          var p1x = p0x + floorx;
          var p1y = p0y + floory;
          var p2x = p1x + basex;
          var p2y = p1y + basey;
          var p3x = p2x + floorx;
          var p3y = p2y + floory;
          // p4 not necessary
          var p5x = p3x - 3 * floorx;
          var p5y = p3y - 3 * floory;

          c.begin();
          c.moveTo(p1x, p1y);
          c.lineTo(p2x, p2y);
          c.moveTo(p5x + floorx, p5y + floory);
          c.lineTo(p0x, p0y);
          c.stroke();
        };

        // Registers the link shape
        mxCellRenderer.registerShape('link', LinkShape);

        // Creates the graph
        let graph = new mxGraph(container);

        // Sets default styles
        let style = graph.getStylesheet().getDefaultVertexStyle();
        style['fillColor'] = '#FFFFFF';
        style['strokeColor'] = '#000000';
        style['fontColor'] = '#000000';
        style['fontStyle'] = '1';

        style = graph.getStylesheet().getDefaultEdgeStyle();
        style['strokeColor'] = '#000000';
        style['fontColor'] = '#000000';
        style['fontStyle'] = '0';
        style['fontStyle'] = '0';
        style['startSize'] = '8';
        style['endSize'] = '8';

        // Populates the graph
        let parent = graph.getDefaultParent();

        graph.getModel().beginUpdate();
        try
        {
          var v1 = graph.insertVertex(parent, null, 'v1', 20, 20, 80, 30);
          var v2 = graph.insertVertex(parent, null, 'v2', 440, 20, 80, 30);
          var e1 = graph.insertEdge(parent, null, '', v1, v2, 'dashed=1;'+
            'startArrow=oval;endArrow=block;sourcePerimeterSpacing=4;startFill=0;endFill=0;');
          var e11 = graph.insertVertex(e1, null, 'Label', 0, 0, 20, 14,
            'shape=message;labelBackgroundColor=#ffffff;labelPosition=left;spacingRight=2;align=right;fontStyle=0;');
          e11.geometry.offset = new mxPoint(-10, -7);
          e11.geometry.relative = true;
          e11.connectable = false;

          var v3 = graph.insertVertex(parent, null, 'v3', 20, 120, 80, 30);
          var v4 = graph.insertVertex(parent, null, 'v4', 440, 120, 80, 30);
          var e2 = graph.insertEdge(parent, null, 'Label', v3, v4,
            'startArrow=dash;startSize=12;endArrow=block;labelBackgroundColor=#FFFFFF;');

          var v5 = graph.insertVertex(parent, null, 'v5', 40, 220, 40, 40, 'shape=ellipse;perimeter=ellipsePerimeter;');
          var v6 = graph.insertVertex(parent, null, 'v6', 460, 220, 40, 40, 'shape=doubleEllipse;perimeter=ellipsePerimeter;');
          var e3 = graph.insertEdge(parent, null, 'Link', v5, v6,
            'shape=link;labelBackgroundColor=#FFFFFF;');
        }
        finally
        {
          graph.getModel().endUpdate();
        }
      }
    };
  </script>
</head>
<body onload="main(document.getElementById('graphContainer'))">
  <div id="graphContainer"
    style="overflow:hidden;position:relative;width:641px;height:381px;border:1px solid gray;cursor:default;">
  </div>
</body>
</html>
