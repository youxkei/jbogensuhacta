# jbogensuhacta
Analysis on lojban corpus

## Requirements
* bash
* wget
* perl
* sort
* nodejs: version 9.0.0 or higher
* gnuplot

## How to perform the analysis

```bash
./fetch-corpus.sh
./preprocess.sh
./parse.js
./analyse.js
./make-graph.sh
```

You'll get results of the analysis as `invalid-jufra.txt`, `analysed.txt`, `lo-per-le.svg`, `oi-per-UI.svg`
