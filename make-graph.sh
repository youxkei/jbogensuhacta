#!/bin/bash
gnuplot << EOS
set term svg;
set output "lo-per-le.svg";
set size 1.1, 1;
set rmargin 10; \
set lmargin 10; \
set ylabel "lo / le（log）" offset 1.5,0; \
set yrange [0.01:70];
set xrange [-1.2:48];
set style data boxes;
set style fill solid 1.0;
set boxwidth 0.5 absolute;
set bar 0.6;
set grid ytics noxtics;
set mytics 1;
set xtics nomirror rotate by -90 scale 0;
set grid ytics noxtics;
set key;
set logscale y 10;
plot "analysed.txt" using (\$0*2.8+1):2:xticlabels(1) with boxes lc rgb "black" fs solid 0.5 title ""
EOS

gnuplot << EOS
set term svg;
set output "oi-per-UI.svg";
set size 1.1, 1;
set rmargin 10; \
set lmargin 10; \
set ylabel "oi / UI" offset 1.5,0; \
set yrange [0.01:0.08];
set xrange [-1.2:48];
set style data boxes;
set style fill solid 1.0;
set boxwidth 0.5 absolute;
set bar 0.6;
set grid ytics noxtics;
set mytics 1;
set xtics nomirror rotate by -90 scale 0;
set grid ytics noxtics;
set key;
plot "analysed.txt" using (\$0*2.8+1):3:xticlabels(1) with boxes lc rgb "black" fs solid 0.5 title ""
EOS
