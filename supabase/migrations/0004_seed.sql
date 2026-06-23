insert into site_settings (name, tagline, description, email, phone, location, founder, artist_alias, socials)
values (
  'FMRXR Studio', 'CREATIVE TECHNOLOGY',
  'Emotional data · Immersive arts · Intelligent realities',
  'fmrxr.studio@gmail.com', '+216 56 930 469', 'Tunis, Tunisie',
  'Haïfa Al Jamila Becheikh', 'EFFET MÈRE',
  '{"instagram":"@fmrxr.studio","tiktok":"@fmrxrstudio","linkedin":"@fmrxrstudio","x":"@fmrxrstudio","web":"fmrxr-studio.webflow.io"}'
);

insert into projects (slug, title, client, year, category, summary, sort_order, published) values
  ('lik','LIK','Rawdha Abdallah','2026','Music visualisation','Audiovisual music visualisation system.',1,true),
  ('vigilance-zero-calypso','Vigilance Zero × Calypso','Morninglory Paris','2026','Live A/V','Live performance — GIG 18 Aug 2026.',2,true),
  ('ooredoo-5g','5G Launch — AI-Driven Immersive Experience','Ooredoo Tunisie','2025','Brand activation','AI-driven immersive launch experience.',3,true),
  ('art-basel-paris','Art Basel Paris','FB Art & Event','2025','Art','Immersive work for Art Basel Paris.',4,true),
  ('spectrum-birth-of-light','SPECTRUM: The Birth of Light','GAT Assurances','2025','Immersive','Immersive corporate experience.',5,true),
  ('djerba-explore','Djerba Explore (#tickettodjerba)','OIF / TICDCE','2024','Installation','Cultural immersive installation.',6,true),
  ('interference','Interference Light Art Festival','Interference International','2024','Festival','Light art across three editions.',7,true),
  ('between-frequencies','Between Frequencies',null,'2024','Live A/V','Generative live performance.',8,true),
  ('bsmnt','BSMNT Immersive Clubbing','BSMNT','2023','Live A/V','Immersive clubbing visuals.',9,true),
  ('dolphin-surf','Dolphin SURF Launch','BYD Tunisie','2026','Brand activation','Product launch experience.',10,true);

insert into services (slug, title, short, sort_order, published) values
  ('creative-direction','Creative Direction','Curation-first creative direction.',1,true),
  ('xr','XR (AR/VR/MR)','Extended reality experiences.',2,true),
  ('projection-mapping','Projection Mapping','Floor, walls and dome mapping.',3,true),
  ('generative-art','Generative Art','Real-time generative systems.',4,true),
  ('interactive-installation','Interactive Installation','Sensor-driven installations.',5,true),
  ('brand-activation','Brand Activation','Live brand experiences.',6,true),
  ('vjing','VJing / Live A/V','Live visual performance.',7,true),
  ('touchdesigner','TouchDesigner / GLSL','Real-time pipelines and shaders.',8,true),
  ('ai-workflows','AI Workflows','n8n, Claude API, ComfyUI pipelines.',9,true),
  ('web','Web','Webflow and web experiences.',10,true);

insert into industries (slug, name, sort_order, published) values
  ('institutional','Institutional & Cultural',1,true),
  ('telecom','Telecom',2,true),
  ('automotive','Automotive',3,true),
  ('finance-insurance','Finance & Insurance',4,true),
  ('art-galleries','Art & Galleries',5,true),
  ('festivals','Festivals',6,true),
  ('nightlife','Nightlife & Events',7,true),
  ('corporate','Corporate & Brands',8,true);

insert into articles (slug, title, category, excerpt, date, read_time, sort_order, published) values
  ('reality-is-generated','Reality Is Not Represented — It Is Generated','Essay','The central hypothesis of EFFET MÈRE.','2026-01-15','5 min',1,true),
  ('systems-over-spectacle','Systems Over Spectacle','Studio','Why FMRXR builds systems, not shows.','2026-02-01','4 min',2,true),
  ('live-conditions','Ships Under Live Conditions','Studio','Designing for opening night.','2026-03-01','4 min',3,true),
  ('touchdesigner-pipeline','Our TouchDesigner Pipeline','Technical','Real-time generative workflow.','2026-03-20','6 min',4,true),
  ('immersive-tunisia','Immersive Art in Tunisia','Context','New media art in Tunis.','2026-04-10','5 min',5,true),
  ('brief-to-opening-night','Brief to Opening Night','Process','How a commission becomes a show.','2026-05-01','5 min',6,true);

insert into stack_items (name, sort_order) values
  ('TouchDesigner',1),('GLSL / Shaders',2),('Python',3),('NDI',4),
  ('Arduino',5),('DMX',6),('Stable Diffusion / ComfyUI',7),('n8n',8),
  ('Claude API',9),('Webflow',10);

insert into clients (name, sort_order) values
  ('Ooredoo Tunisie',1),('Samsung',2),('Epson',3),('BYD Tunisie',4),
  ('GAT Assurances',5),('OIF',6),('Goethe Institut',7),('FB Art & Event',8),
  ('Morninglory Paris',9),('Interference International',10),('BSMNT',11),('CTV Productions',12);
