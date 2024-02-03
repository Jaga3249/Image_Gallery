import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState } from "react";
import "./App.css";
import { ImageGallery } from "./Types/GlobalTypes";
import ImageCards from "./cards/ImageCards";
import { initialImageData } from "./data";

const App = () => {
  const [galleryData, setGalleryData] = useState(initialImageData);
  const [activeItem, setActiveItem] = useState<ImageGallery | null>(null);

  // dnd code starts here
  const senser = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { id } = event.active;
    if (!id) return;
    const currentItem = galleryData.find((item) => item.id === id);
    setActiveItem(currentItem || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveItem(null);
    const { over, active } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setGalleryData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  // dnd code end here

  const handleSelect = () => {};
  return (
    <div className="min-h-screen">
      <div
        className="container flex items-center flex-col"
        // style={{ border: "2px solid red" }}
      >
        <div
          className="bg-white my-8  rounded-lg shadow max-w-5xl grid divide-y"
          // style={{ border: "2px solid red" }}
        >
          <header className="text-xl">Showcase</header>
          {/* dnd context */}
          <DndContext
            sensors={senser}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10"
              style={{ border: "2px solid red" }}
            >
              <SortableContext
                items={galleryData}
                strategy={rectSortingStrategy}
              >
                {galleryData.map((imageItem) => (
                  <ImageCards
                    key={imageItem.id}
                    id={imageItem.id}
                    slug={imageItem.slug}
                    isSelected={imageItem.isSelected}
                    onClick={handleSelect}
                  />
                ))}
              </SortableContext>
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default App;
