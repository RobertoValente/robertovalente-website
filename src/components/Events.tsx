import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import eventsData from "@/lib/data/events.json";
import { ExternalLink } from "lucide-react";

export function Events() {
    const eventsByYear = eventsData.events.reduce((acc, event) => {
        const year = event.year.toString();
        
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(event);
        return acc;
    }, {} as Record<string, typeof eventsData.events>);

    const sortedYears = Object.keys(eventsByYear).sort((a, b) => b.localeCompare(a));
    
    const getCountryFlag = (location: string) => {
        const lowerLocation = location.toLowerCase();
        if (lowerLocation.includes('portugal')) return '🇵🇹';
        if (lowerLocation.includes('france')) return '🇫🇷';
        return '🌍';
    };

    const getYearStatus = (year: string) => {
        const currentYear = new Date().getFullYear();
        const yearNum = parseInt(year);
        
        if (yearNum > currentYear) {
            return { label: 'Upcoming', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' };
        } else if (yearNum === currentYear) {
            return { label: 'Current', color: 'bg-green-500/10 text-green-500 border-green-500/20' };
        } else {
            return { label: 'Past', color: 'bg-gray-500/10 text-gray-500 border-gray-500/20' };
        }
    };

    return (
        <section id="events" className="px-4">
            <div className="mb-6 group">
                <div className="relative">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-200">
                            <span className="text-xl">🏆</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-foreground uppercase underline underline-offset-4">
                                Events
                            </h2>
                        </div>
                    </div>
                    <div className="absolute left-5 top-12 w-px h-4 bg-gradient-to-b from-primary/40 to-transparent"></div>
                </div>
            </div>
            {eventsData.events.length === 0 ? (
                <div className="text-muted-foreground text-sm">
                    No events found. Check back later!
                </div>
            ) : (
                <Card className="p-0 transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-4 group">
                        <div className="space-y-4">
                            {sortedYears.map((year) => {
                                const yearStatus = getYearStatus(year);
                                
                                return (
                                    <div key={year} className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-semibold text-primary">{year}</h3>
                                            <Badge className={`text-xs font-medium border ${yearStatus.color}`}>
                                                {yearStatus.label}
                                            </Badge>
                                            <div className="flex-1 h-px bg-border" />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            {eventsByYear[year].map((event, idx) => {
                                                const flag = getCountryFlag(event.location);
                                                
                                                return (
                                                    <div key={idx} className="flex items-center gap-3 py-2 hover:bg-muted/30 rounded-lg px-2 transition-colors">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                                                <h4 className="font-medium text-sm">{event.name}</h4>
                                                            </div>
                                                            
                                                            {event.location && (
                                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                    <span>{flag}</span>
                                                                    <span>{event.location}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        {event.url && (
                                                            <Link 
                                                                href={event.url} 
                                                                target="_blank"
                                                                className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-primary/10 hover:scale-105 transition-all duration-200 group"
                                                                title="Learn more"
                                                            >
                                                                <ExternalLink className="size-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200" />
                                                            </Link>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}
        </section>
    );
}