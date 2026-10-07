'use client';

import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

type CalendarEvent = {
  id: string;
  day: number;
  title: string;
  time: string;
  span?: number;
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const INITIAL_EVENTS: CalendarEvent[] = [
  { id: 'evt-1', day: 2, title: 'Order # 121548', time: '12:00 PM' },
  { id: 'evt-2', day: 9, title: 'Order # 121548', time: '12:00 PM', span: 2 },
  { id: 'evt-3', day: 9, title: 'Order # 121548', time: '12:00 PM' },
  { id: 'evt-4', day: 12, title: 'Order # 121548', time: '12:00 PM' },
  { id: 'evt-5', day: 15, title: 'Order # 121548', time: '12:00 PM' },
  { id: 'evt-6', day: 23, title: 'Order # 121548', time: '12:00 PM', span: 4 },
];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function startWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function MonthlyCalendar() {
  const [cursor, setCursor] = useState({ year: 2025, month: 3 });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverDay, setDragOverDay] = useState<number | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const resizingRef = useRef<{
    id: string;
    startX: number;
    initialSpan: number;
    day: number;
    col: number;
  } | null>(null);
  const [resizingId, setResizingId] = useState<string | null>(null);
  const [previewSpan, setPreviewSpan] = useState<number | null>(null);

  const totalDays = daysInMonth(cursor.year, cursor.month);
  const offset = startWeekday(cursor.year, cursor.month);
  const cellCount = Math.ceil((offset + totalDays) / 7) * 7;

  const cells = useMemo(
    () =>
      Array.from({ length: cellCount }, (_, i) => {
        const dayNum = i - offset + 1;
        return dayNum >= 1 && dayNum <= totalDays ? dayNum : null;
      }),
    [cellCount, offset, totalDays]
  );

  const eventsByDay = useMemo(() => {
    const map = new Map<number, CalendarEvent[]>();
    for (const event of events) {
      if (event.day > totalDays) continue;
      const list = map.get(event.day) ?? [];
      list.push(event);
      map.set(event.day, list);
    }
    return map;
  }, [events, totalDays]);

  const goMonth = (delta: number) => {
    setCursor((prev) => {
      const date = new Date(prev.year, prev.month + delta, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
    setDropdownOpen(false);
  };

  const handleDragStart = (eventId: string) => {
    setDraggedId(eventId);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverDay(null);
  };

  const handleDragOver = (e: React.DragEvent, day: number | null) => {
    e.preventDefault();
    if (day != null) setDragOverDay(day);
  };

  const handleDrop = (e: React.DragEvent, day: number | null) => {
    e.preventDefault();
    if (day == null || draggedId == null) return;

    setEvents((prev) =>
      prev.map((event) =>
        event.id === draggedId ? { ...event, day } : event
      )
    );
    setDraggedId(null);
    setDragOverDay(null);
  };

  // ----- RESIZE LOGIC -----
  const handleResizeStart = (
    e: React.MouseEvent,
    event: CalendarEvent,
    col: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    resizingRef.current = {
      id: event.id,
      startX: e.clientX,
      initialSpan: event.span ?? 1,
      day: event.day,
      col,
    };
    setResizingId(event.id);
    setPreviewSpan(event.span ?? 1);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const resizing = resizingRef.current;
      if (!resizing || !gridRef.current) return;

      const gridWidth = gridRef.current.offsetWidth;
      const colWidth = gridWidth / 7;
      const deltaX = e.clientX - resizing.startX;
      const deltaCols = Math.round(deltaX / colWidth);

      const maxSpan = Math.min(7 - resizing.col, totalDays - resizing.day + 1);
      const newSpan = Math.min(
        Math.max(resizing.initialSpan + deltaCols, 1),
        maxSpan
      );

      setPreviewSpan(newSpan);
    },
    [totalDays]
  );

  const handleMouseUp = useCallback(() => {
    const resizing = resizingRef.current;
    if (!resizing) return;

    setEvents((prev) =>
      prev.map((event) =>
        event.id === resizing.id
          ? { ...event, span: previewSpan ?? event.span }
          : event
      )
    );

    resizingRef.current = null;
    setResizingId(null);
    setPreviewSpan(null);
  }, [previewSpan]);

  useEffect(() => {
    if (resizingId == null) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingId, handleMouseMove, handleMouseUp]);
  // ----- END RESIZE LOGIC -----

  return (
    <div className="bg-white border border-[#ECEFF3] rounded-[18px] shadow-[0px_1px_50px_rgba(16,24,40,0.08)] p-5 md:p-6 h-full flex flex-col min-h-[640px] font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="relative flex items-center justify-center gap-6 mb-5 h-20">
        <button
          type="button"
          onClick={() => goMonth(-1)}
          className="size-8 rounded-lg text-[#98A1AE] hover:text-[#0B1B34] hover:bg-[#F4F7FB] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={() => setDropdownOpen((open) => !open)}
          className="flex items-center gap-1.5 text-[18px] font-medium text-[#0B1B34] cursor-pointer"
        >
          {MONTHS[cursor.month]} {cursor.year}
          <ChevronDown
            size={20}
            className={`text-[#98A1AE] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <button
          type="button"
          onClick={() => goMonth(1)}
          className="size-8 rounded-lg text-[#98A1AE] hover:text-[#0B1B34] hover:bg-[#F4F7FB] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>

        {dropdownOpen && (
          <div className="absolute top-14 z-30 w-44 rounded-xl bg-white border border-[#E6EAEF] shadow-lg py-1.5">
            {MONTHS.map((name, index) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setCursor((prev) => ({ ...prev, month: index }));
                  setDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm font-normal transition-colors cursor-pointer ${index === cursor.month
                    ? 'text-[#4D8EF5] bg-[#F4F7FB]'
                    : 'text-[#5B6878] hover:bg-[#F7F9FF]'
                  }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-7 flex-1 border-t border-l border-[#EEF1F4] rounded-[12px] overflow-hidden"
      >
        {cells.map((day, index) => {
          const dayEvents = day != null ? eventsByDay.get(day) ?? [] : [];
          const col = index % 7;
          const isDragOver = day != null && dragOverDay === day;

          return (
            <div
              key={index}
              onDragOver={(e) => handleDragOver(e, day)}
              onDragLeave={() => setDragOverDay((prev) => (prev === day ? null : prev))}
              onDrop={(e) => handleDrop(e, day)}
              className={`relative min-h-[120px] lg:min-h-[150px] border-r border-b border-[#EEF1F4] p-2 transition-colors ${isDragOver ? 'bg-[#EAF1FF]' : 'bg-white'
                }`}
            >
              {day != null && (
                <span className="text-[13px] font-normal text-[#5B6878] leading-none">{day}</span>
              )}

              <div className="mt-2 space-y-1.5">
                {dayEvents.map((event) => {
                  const maxSpan = 7 - col;
                  const rawSpan =
                    resizingId === event.id && previewSpan != null
                      ? previewSpan
                      : event.span ?? 1;
                  const span = Math.min(rawSpan, maxSpan, totalDays - event.day + 1);
                  const isDragging = draggedId === event.id;
                  const isResizing = resizingId === event.id;

                  return (
                    <div
                      key={event.id}
                      draggable={!isResizing}
                      onDragStart={() => handleDragStart(event.id)}
                      onDragEnd={handleDragEnd}
                      className={`group relative z-10 rounded-[8px] bg-[#5182EA] text-white px-2 py-2 shadow-sm cursor-grab active:cursor-grabbing hover:bg-[#3F73E0] transition-all ${isDragging ? 'opacity-40 scale-95' : 'opacity-100'
                        } ${isResizing ? 'ring-2 ring-white/70' : ''}`}
                      style={
                        span > 1
                          ? { width: `calc(${span * 100}% + ${(span - 1) * 1}px - 4px)` }
                          : undefined
                      }
                    >
                      <p className="text-[12px] font-medium leading-tight truncate pr-2">
                        {event.title}
                      </p>
                      <p className="text-[11px] text-white/85 leading-tight mt-1">{event.time}</p>

                      {/* Resize Handle */}
                      <div
                        onMouseDown={(e) => handleResizeStart(e, event, col)}
                        className="absolute top-0 right-0 h-full w-2.5 cursor-ew-resize flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <div className="w-[3px] h-4 rounded-full bg-white/70" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}