"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Images, ChevronLeft, ChevronRight } from "lucide-react"
import projectsData from "@/lib/data/projects.json";

/*type Project = {
    status: string;
    title: string;
    description: string;
    urlGithub?: string;
    urlSite?: string;
    images: string[];
};*/

export function Projects() {
	const [open, setOpen] = useState(false);
	const [currentImages, setCurrentImages] = useState<string[]>([]);
	const [currentIdx, setCurrentIdx] = useState(0);

	const openViewer = (images: string[]) => {
		setCurrentImages(images);
		setCurrentIdx(0);
		setOpen(true);
	};

	const closeViewer = () => setOpen(false);

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case 'active':
				return 'bg-green-500/10 text-green-500 border-green-500/20';
			case 'archived':
				return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
			case 'mvp':
				return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
			default:
				return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
		}
	};

	return (
		<section id="projects" className="px-4">
			<div className="mb-6 group">
				<div className="relative">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-200">
							<span className="text-xl">🗂️</span>
						</div>
						<div>
							<h2 className="text-xl font-bold tracking-tight text-foreground uppercase underline underline-offset-4">
								Projects
							</h2>
						</div>
					</div>
					<div className="absolute left-5 top-12 w-px h-4 bg-gradient-to-b from-primary/40 to-transparent"></div>
				</div>
			</div>
			<div className="flex flex-col gap-4">
                {projectsData.projects.length === 0 ? (
                    <div className="text-muted-foreground text-sm">
                        No projects found. Check back later!
                    </div>
                ) : (
                    (projectsData.projects.map((project, idx) => (
                        <Card key={idx} className="transition-all duration-300 hover:shadow-lg group">
                            <CardContent className="px-6 group">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-xl tracking-tight">{project.title}</h3>
                                            <Badge className={`text-xs font-medium border ${getStatusColor(project.status)}`}>
                                                {project.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    <div className="-mt-1">
                                        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.images.length > 0 && (
                                            <Button
                                                variant="default"
                                                size={"sm"}
                                                className="hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 cursor-pointer group"
                                                onClick={() => openViewer(project.images)}
                                                title="View Screenshots"
                                            >
                                                <Images className="size-4 group-hover:scale-110 transition-transform duration-200" />
                                                Screenshots
                                            </Button>
                                        )}

                                        {project.urlSite && (
                                            <Button
                                                asChild
                                                variant="outline"
                                                size={"sm"}
                                                className="hover:scale-105 hover:shadow-md hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
                                                title="Visit Site"
                                            >
                                                <Link href={project.urlSite} target="_blank">
                                                    <ExternalLink className="size-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200" />
                                                    Visit
                                                </Link>
                                            </Button>
                                        )}

                                        {project.urlGithub && (
                                            <Button
                                                asChild
                                                variant="outline"
                                                size={"sm"}
                                                className="hover:scale-105 hover:shadow-md hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
                                                title="View GitHub Repository"
                                            >
                                                <Link href={project.urlGithub} target="_blank">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>
                                                    GitHub
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )))
                )}
			</div>
			
			{open && (
				<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="bg-background/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 relative max-w-2xl w-full flex flex-col items-center border border-primary/10">
						<div className="flex justify-between items-center w-full mb-6">
							<div className="flex items-center gap-3">
								<h3 className="text-lg font-medium text-foreground">Screenshots</h3>
							</div>
							<Button
								size="icon"
								variant="ghost"
								className="hover:bg-red-500/10 hover:text-red-500 transition-colors rounded-full cursor-pointer"
								onClick={closeViewer}
								title="Close"
							>
								<svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</Button>
						</div>

						<div className="relative mb-6 rounded-2xl overflow-hidden border border-primary/10 bg-muted/30">
							<Image
								src={currentImages[currentIdx]}
								alt={`Project Screenshot ${currentIdx + 1}`}
								width={600}
								height={400}
								className="object-contain w-full h-auto max-h-[60vh]"
								style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}
							/>
							
							{currentImages.length > 1 && (
								<div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
									{currentIdx + 1} / {currentImages.length}
								</div>
							)}
						</div>

						{currentImages.length > 1 && (
							<div className="flex items-center gap-4 mb-4">
								<Button
									size="icon"
									variant="outline"
									className="hover:scale-105 transition-all duration-200 rounded-full bg-background/50 backdrop-blur-sm border-primary/20 cursor-pointer"
									onClick={() => setCurrentIdx((i) => Math.max(i - 1, 0))}
									disabled={currentIdx === 0}
									title="Previous image"
								>
									<ChevronLeft className="size-4" />
								</Button>
								
								<div className="flex gap-2">
									{currentImages.map((_, idx) => (
										<button
											key={idx}
											className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
												idx === currentIdx 
													? 'bg-primary scale-125' 
													: 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
											}`}
											onClick={() => setCurrentIdx(idx)}
											title={`Go to image ${idx + 1}`}
										/>
									))}
								</div>
								
								<Button
									size="icon"
									variant="outline"
									className="hover:scale-105 transition-all duration-200 rounded-full bg-background/50 backdrop-blur-sm border-primary/20 cursor-pointer"
									onClick={() =>
										setCurrentIdx((i) =>
											Math.min(i + 1, currentImages.length - 1)
										)
									}
									disabled={currentIdx === currentImages.length - 1}
									title="Next image"
								>
									<ChevronRight className="size-4" />
								</Button>
							</div>
						)}

						<div className="text-center">
							<Button
								variant="outline"
								className="hover:scale-105 transition-all duration-200 rounded-full px-6 bg-background/50 backdrop-blur-sm border-primary/20 cursor-pointer"
								onClick={closeViewer}
							>
								Close
							</Button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
