import { Badge, Card, Flex, Grid, Inset } from "@radix-ui/themes";

const upcomingItems = [
  {
    title: "AI와 함께하는 CS학습 1",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    topic: "AI & 머신러닝",
    description: "AI와 함께하는 CS학습 1",
    unlockDate: "2026-02-09",
    unlockTime: "09:00",
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "AI와 함께하는 CS학습: 프롬프트 학습",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    topic: "기획",
    description: "AI와 함께하는 CS학습 1",
    unlockDate: "2026-02-10",
    unlockTime: "09:00",
    color: "bg-pink-100 text-pink-700",
  },
  {
    title: "AI와 함께하는 CS학습 3",
    thumbnail:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    topic: "프론트엔드 개발",
    description: "AI와 함께하는 CS학습 1",
    unlockDate: "2026-02-11",
    unlockTime: "09:00",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "AI와 함께하는 CS학습 4",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    topic: "프론트엔드 개발",
    description: "AI와 함께하는 CS학습 1",
    unlockDate: "2026-02-11",
    unlockTime: "09:00",
    color: "bg-blue-100 text-blue-700",
  },
];

export function UpcomingContent() {
  return (
    <div className="bg-neutral-50 rounded-3xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold">AI와 함께하는 CS학습</h3>
      </div>
      <Grid columns="2" gap="4">
        {upcomingItems.map((item, index) => (
          <Card>
            <Flex>
              <Inset clip="padding-box" side="left" pr="current">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-50 h-50 object-cover"
                />
              </Inset>

              <Flex direction="column" gap="2">
                <Flex align="center" gap="2" mb="2">
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  {index === 1 && <Badge color="pink">Now</Badge>}
                </Flex>
                <Badge variant="soft" className="w-fit">
                  {item.topic}
                </Badge>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
