FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/GasComIT/AlienAlfa.git /root/AlienAlfa/
WORKDIR /root/AlienAlfa/
RUN yarn install --network-concurrency 1
CMD ["node", "bot.js"] 
