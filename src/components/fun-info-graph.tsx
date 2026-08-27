import Link from "next/link";
import { graphNodesByInfo, nodeLabel, type GraphNode } from "@/lib/site";

/**
 * The homepage Fun/Info graph (handoff doc §4).
 *
 * Deliberately has no client JavaScript: every dot is a real link, and hover
 * and focus states are pure CSS. That keeps the homepage's centrepiece working
 * before hydration and for anyone with JS disabled.
 *
 * Two layouts are rendered and swapped with `display`, rather than one layout
 * being scaled down — the mobile version is a different form carrying the same
 * two variables. Only one is ever displayed, and `display: none` removes the
 * other from the accessibility tree, so links are never announced twice.
 */

/* --- desktop geometry --- */
const D = { left: 96, right: 752, top: 44, bottom: 444 };
const dx = (info: number) => D.left + (info / 100) * (D.right - D.left);
const dy = (fun: number) => D.bottom - (fun / 100) * (D.bottom - D.top);

/* --- mobile geometry --- */
const M = { trackLeft: 138, trackRight: 302, top: 82, gap: 71 };
const mx = (fun: number) =>
  M.trackLeft + (fun / 100) * (M.trackRight - M.trackLeft);
const my = (index: number) => M.top + index * M.gap;

function Dot({
  node,
  cx,
  cy,
  children,
}: {
  node: GraphNode;
  cx: number;
  cy: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={node.href}
      className="graph-node"
      // The visible label below is aria-hidden, so this string is the entire
      // announcement and has to stand on its own.
      aria-label={nodeLabel(node)}
    >
      {children}
      <circle cx={cx} cy={cy} r={22} className="graph-halo" />
      <circle cx={cx} cy={cy} r={15} className="graph-focus-ring" />
      <circle cx={cx} cy={cy} r={6} className="graph-dot" />
    </Link>
  );
}

function DesktopGraph() {
  const points = graphNodesByInfo
    .map((n) => `${dx(n.info)},${dy(n.fun)}`)
    .join(" ");

  const gridLines = [1, 2, 3, 4];

  return (
    <svg
      viewBox="0 0 800 520"
      className="hidden h-auto w-full sm:block"
      role="group"
      aria-labelledby="graph-title-desktop"
    >
      <title id="graph-title-desktop">
        Site sections plotted by information density and playfulness
      </title>

      {gridLines.map((i) => (
        <line
          key={`v${i}`}
          x1={D.left + (i / 5) * (D.right - D.left)}
          y1={D.top}
          x2={D.left + (i / 5) * (D.right - D.left)}
          y2={D.bottom}
          className="graph-grid-line"
        />
      ))}
      {gridLines.map((i) => (
        <line
          key={`h${i}`}
          x1={D.left}
          y1={D.top + (i / 5) * (D.bottom - D.top)}
          x2={D.right}
          y2={D.top + (i / 5) * (D.bottom - D.top)}
          className="graph-grid-line"
        />
      ))}

      <line
        x1={D.left}
        y1={D.top - 8}
        x2={D.left}
        y2={D.bottom}
        className="graph-axis-line"
      />
      <line
        x1={D.left}
        y1={D.bottom}
        x2={D.right + 12}
        y2={D.bottom}
        className="graph-axis-line"
      />

      <text
        className="graph-axis-label"
        transform={`translate(52, ${(D.top + D.bottom) / 2}) rotate(-90)`}
        textAnchor="middle"
      >
        Fun
      </text>
      <text
        x={(D.left + D.right) / 2}
        y={D.bottom + 48}
        className="graph-axis-label"
        textAnchor="middle"
      >
        Info
      </text>

      <text x={D.left} y={D.bottom + 24} className="graph-axis-end">
        sparse
      </text>
      <text
        x={D.right + 12}
        y={D.bottom + 24}
        className="graph-axis-end"
        textAnchor="end"
      >
        dense
      </text>
      <text
        x={D.left - 12}
        y={D.top + 2}
        className="graph-axis-end"
        textAnchor="end"
      >
        playful
      </text>
      <text
        x={D.left - 12}
        y={D.bottom - 4}
        className="graph-axis-end"
        textAnchor="end"
      >
        serious
      </text>

      <polyline points={points} className="graph-connector" />

      {graphNodesByInfo.map((node) => {
        const cx = dx(node.info);
        const cy = dy(node.fun);
        // Keep the right-most label inside the frame.
        const onRight = node.info > 82;

        return (
          <Dot key={node.href} node={node} cx={cx} cy={cy}>
            <text
              x={onRight ? cx - 16 : cx + 16}
              y={cy + 5}
              className="graph-label"
              textAnchor={onRight ? "end" : "start"}
              aria-hidden="true"
            >
              {node.label}
            </text>
          </Dot>
        );
      })}
    </svg>
  );
}

function MobileGraph() {
  const points = graphNodesByInfo
    .map((n, i) => `${mx(n.fun)},${my(i)}`)
    .join(" ");

  return (
    <svg
      viewBox="0 0 340 560"
      className="mx-auto h-auto w-full max-w-sm sm:hidden"
      role="group"
      aria-labelledby="graph-title-mobile"
    >
      <title id="graph-title-mobile">
        Site sections ordered by information, offset by playfulness
      </title>

      <text x={M.trackLeft} y={34} className="graph-axis-label">
        Fun →
      </text>
      <text
        className="graph-axis-label"
        transform={`translate(20, ${(M.top + my(graphNodesByInfo.length - 1)) / 2}) rotate(-90)`}
        textAnchor="middle"
      >
        Info ↓
      </text>

      <line
        x1={M.trackLeft}
        y1={48}
        x2={M.trackRight}
        y2={48}
        className="graph-grid-line"
      />

      <polyline points={points} className="graph-connector" />

      {graphNodesByInfo.map((node, i) => {
        const cy = my(i);
        const cx = mx(node.fun);

        return (
          <Dot key={node.href} node={node} cx={cx} cy={cy}>
            {/* Full-width row hit target, so the tap area clears 44px rather
                than being a 12px dot. */}
            <rect
              x={34}
              y={cy - 28}
              width={288}
              height={56}
              rx={8}
              className="graph-hit"
            />
            <text x={38} y={cy + 5} className="graph-label" aria-hidden="true">
              {node.label}
            </text>
          </Dot>
        );
      })}
    </svg>
  );
}

export function FunInfoGraph() {
  return (
    <div>
      <DesktopGraph />
      <MobileGraph />
    </div>
  );
}
