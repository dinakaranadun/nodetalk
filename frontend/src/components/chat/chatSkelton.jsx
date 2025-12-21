
const UsersLoadingSkeleton = () => (
  <div className="flex flex-col gap-3 p-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="bg-white/30 backdrop-blur-md p-4 rounded-2xl border border-white/40 animate-pulse shadow-lg">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-full bg-white/50" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/40 rounded-lg w-2/3" />
            <div className="h-3 bg-white/30 rounded-lg w-1/2" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
export default UsersLoadingSkeleton