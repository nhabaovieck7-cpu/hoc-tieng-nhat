// sprites.js — Vẽ sprite chibi bằng code (canvas vector), tiền dựng thành khung hình.
// Mỗi nhân vật: 4 hướng × 3 khung (đứng, bước trái, bước phải). Nhất quán theo thông số:
// da, tóc + kiểu tóc, áo, quần/váy, tạp dề, sẹo… — không dùng tài nguyên ngoài.
(function () {
  'use strict';
  var S = 3;                 // hệ số phóng khi vẽ (khung logic 32×48 → 96×144)
  var W = 32, H = 48;

  function cnv(w, h) { var c = document.createElement('canvas'); c.width = w * S; c.height = h * S; return c; }
  function rr(g, x, y, w, h, r) {
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r);
    g.closePath(); g.fill();
  }
  function circ(g, x, y, r) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); }

  // spec: {skin, hair, hairStyle:'short'|'long'|'pony'|'bob'|'bun'|'twin', shirt, pants, skirt:bool, apron:bool, scar:bool,
  //        acc:[...]} — acc = danh sách phụ kiện ĐANG ĐEO, vẽ thành lớp riêng sau thân/tóc:
  //        'glasses' (kính), 'necklace' (vòng cổ), 'bag' (túi xách đeo chéo), 'hat' (mũ lưỡi trai),
  //        'watch' (đồng hồ cổ tay), 'earring' (khuyên tai). Hệ ngoại hình ở style.js cấp spec này.
  function drawChar(spec, dir, frame) {
    var c = cnv(W, H), g = c.getContext('2d');
    g.scale(S, S);
    var cx = 16;                       // tâm ngang
    var walk = frame !== 0;            // frame 1/2 = đang bước
    var legSwing = frame === 1 ? 2.2 : (frame === 2 ? -2.2 : 0);
    var bob = walk ? -0.8 : 0;
    var side = (dir === 'left' || dir === 'right');
    var flip = dir === 'left';

    g.save();
    if (flip) { g.translate(W, 0); g.scale(-1, 1); }

    // --- Chân/giày ---
    g.fillStyle = spec.skirt ? spec.skin : spec.pants;
    var legY = 38 + bob * 0.3;
    if (side) {
      rr(g, cx - 2.4 + legSwing * 0.7, legY, 4.6, 7, 1.6);
      rr(g, cx - 2.4 - legSwing * 0.7, legY, 4.6, 7, 1.6);
    } else {
      rr(g, cx - 5.4 + legSwing * 0.45, legY, 4.6, 7, 1.6);
      rr(g, cx + 0.8 - legSwing * 0.45, legY, 4.6, 7, 1.6);
    }
    g.fillStyle = '#3a3230';
    if (side) {
      rr(g, cx - 2.8 + legSwing * 0.7, 44.4, 5.6, 2.6, 1.2);
      rr(g, cx - 2.8 - legSwing * 0.7, 44.4, 5.6, 2.6, 1.2);
    } else {
      rr(g, cx - 5.8 + legSwing * 0.45, 44.4, 5.4, 2.6, 1.2);
      rr(g, cx + 0.6 - legSwing * 0.45, 44.4, 5.4, 2.6, 1.2);
    }

    // --- Thân ---
    var bodyY = 24 + bob;
    if (spec.skirt) {
      g.fillStyle = spec.pants; // màu váy truyền qua trường pants
      g.beginPath();
      g.moveTo(cx - 5, bodyY + 3); g.lineTo(cx + 5, bodyY + 3);
      g.lineTo(cx + 8, bodyY + 14); g.lineTo(cx - 8, bodyY + 14);
      g.closePath(); g.fill();
    } else {
      g.fillStyle = spec.pants;
      rr(g, cx - 5.6, bodyY + 8, 11.2, 7, 2);
    }
    g.fillStyle = spec.shirt;
    rr(g, cx - 7, bodyY, 14, 11, 3.5);
    if (spec.apron) {
      g.fillStyle = '#f6f2e8';
      rr(g, cx - 5, bodyY + 2.5, 10, 10.5, 2);
      g.fillStyle = '#d84f4f';
      rr(g, cx - 5, bodyY + 2.5, 10, 2.2, 1);
    }
    // Tay (đung đưa ngược chân khi đi)
    g.fillStyle = spec.shirt;
    var armSwing = walk ? -legSwing * 0.5 : 0;
    if (side) {
      rr(g, cx - 1.8, bodyY + 1.5 + Math.max(0, armSwing), 3.6, 9, 1.8);
    } else {
      rr(g, cx - 9.6, bodyY + 1.5 + armSwing * 0.4, 3.8, 9.5, 1.9);
      rr(g, cx + 5.8, bodyY + 1.5 - armSwing * 0.4, 3.8, 9.5, 1.9);
    }
    g.fillStyle = spec.skin;
    if (!side) { circ(g, cx - 7.7, bodyY + 11.4, 1.9); circ(g, cx + 7.7, bodyY + 11.4, 1.9); }

    // --- Đầu ---
    var headY = 13 + bob, headR = 9.4;
    if (spec.hairStyle === 'twin' && dir !== 'up') {
      g.fillStyle = spec.hair;
      rr(g, cx - 12.4, headY - 1, 4.6, 15, 2.2); rr(g, cx + 7.8, headY - 1, 4.6, 15, 2.2); // hai bím hai bên
    }
    if (spec.hairStyle === 'long' && dir !== 'up') {
      g.fillStyle = spec.hair;
      rr(g, cx - 9.8, headY - 6, 19.6, 24, 7); // tóc dài sau lưng
    }
    if (spec.hairStyle === 'long' && dir === 'up') {
      g.fillStyle = spec.hair;
      rr(g, cx - 9.8, headY - 6, 19.6, 26, 7);
    }
    g.fillStyle = spec.skin;
    circ(g, cx, headY, headR);
    // Tai
    if (!side) { circ(g, cx - headR, headY + 1, 2); circ(g, cx + headR, headY + 1, 2); }

    // Tóc theo hướng
    g.fillStyle = spec.hair;
    if (dir === 'up') {
      circ(g, cx, headY - 0.6, headR + 0.7); // sau đầu phủ kín
      if (spec.hairStyle === 'pony') { rr(g, cx - 2.4, headY + 6, 4.8, 9, 2.4); }
      if (spec.hairStyle === 'bun') { circ(g, cx, headY - 9.6, 3.4); }
      if (spec.hairStyle === 'twin') { circ(g, cx - 9.6, headY - 4.6, 2.8); circ(g, cx + 9.6, headY - 4.6, 2.8); }
    } else if (side) {
      g.beginPath(); g.arc(cx, headY - 1.4, headR + 0.5, Math.PI * 0.95, Math.PI * 2.05); g.fill();
      rr(g, cx - headR - 0.6, headY - 3, 5.4, 10, 2.4); // tóc phía sau
      if (spec.hairStyle === 'pony') { rr(g, cx - headR - 2.4, headY + 2, 4.4, 10, 2.2); }
      if (spec.hairStyle === 'long') { rr(g, cx - headR - 0.8, headY + 1, 5, 13, 2.4); }
      if (spec.hairStyle === 'bob') { rr(g, cx - headR - 0.8, headY + 1, 5, 11, 2.4); }
      if (spec.hairStyle === 'bun') { circ(g, cx - 1, headY - 9.8, 3.2); }
      if (spec.hairStyle === 'twin') { circ(g, cx - 9.4, headY - 4.4, 2.7); }
    } else {
      g.beginPath(); g.arc(cx, headY - 1.6, headR + 0.5, Math.PI, Math.PI * 2); g.fill();
      rr(g, cx - headR - 0.5, headY - 3.4, headR * 2 + 1, 4.6, 2.2); // mái
      if (spec.hairStyle === 'long') { rr(g, cx - headR - 1.6, headY - 2, 4.6, 15, 2.2); rr(g, cx + headR - 3, headY - 2, 4.6, 15, 2.2); }
      if (spec.hairStyle === 'pony') { rr(g, cx + headR - 1.4, headY - 4, 4.6, 12, 2.2); }
      if (spec.hairStyle === 'bob') { rr(g, cx - headR - 1.6, headY - 2, 4.6, 12.5, 2.2); rr(g, cx + headR - 3, headY - 2, 4.6, 12.5, 2.2); } // bob ôm má tới cằm
      if (spec.hairStyle === 'bun') { circ(g, cx, headY - 10.2, 3.6); } // búi tròn trên đỉnh
      if (spec.hairStyle === 'twin') { circ(g, cx - 9.6, headY - 4.6, 2.8); circ(g, cx + 9.6, headY - 4.6, 2.8); } // hai chỏm buộc
    }

    // Mặt
    g.fillStyle = '#33302e';
    if (dir === 'down') {
      circ(g, cx - 3.4, headY + 1.6, 1.15); circ(g, cx + 3.4, headY + 1.6, 1.15);
      g.strokeStyle = '#b06a5a'; g.lineWidth = 0.9;
      g.beginPath(); g.arc(cx, headY + 3.6, 2.2, 0.25 * Math.PI, 0.75 * Math.PI); g.stroke();
      if (spec.scar) { // vết sẹo nhỏ má trái (dấu ấn của Hùng "sẹo")
        g.strokeStyle = '#d9a08e'; g.lineWidth = 1.1;
        g.beginPath(); g.moveTo(cx - 6.4, headY + 2.4); g.lineTo(cx - 4.6, headY + 5); g.stroke();
      }
    } else if (side) {
      circ(g, cx + 3.6, headY + 1.6, 1.15);
      if (spec.scar) {
        g.strokeStyle = '#d9a08e'; g.lineWidth = 1.1;
        g.beginPath(); g.moveTo(cx + 5.4, headY + 2.2); g.lineTo(cx + 6.8, headY + 4.6); g.stroke();
      }
    }
    // --- PHỤ KIỆN (lớp riêng, vẽ SAU thân + tóc — hệ ngoại hình style.js cấp qua spec.acc) ---
    var acc = spec.acc || [];
    if (acc.indexOf('necklace') >= 0 && dir === 'down') {
      g.strokeStyle = '#d9a441'; g.lineWidth = 1.3;
      g.beginPath(); g.arc(cx, bodyY + 0.5, 4.6, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke();
      g.fillStyle = '#ffd94d'; circ(g, cx, bodyY + 5.6, 1.5);
    }
    if (acc.indexOf('earring') >= 0 && dir !== 'up') {
      g.fillStyle = '#ffd94d';
      if (side) circ(g, cx + 1.5, headY + 4.6, 1.15);
      else { circ(g, cx - headR - 0.4, headY + 4.4, 1.15); circ(g, cx + headR + 0.4, headY + 4.4, 1.15); }
    }
    if (acc.indexOf('glasses') >= 0 && dir !== 'up') {
      g.strokeStyle = '#2c2c34'; g.lineWidth = 1.1;
      if (side) { g.strokeRect(cx + 0.8, headY - 0.6, 6.4, 4.6); }
      else {
        g.strokeRect(cx - 7.6, headY - 0.6, 6.6, 4.8); g.strokeRect(cx + 1, headY - 0.6, 6.6, 4.8);
        g.beginPath(); g.moveTo(cx - 1, headY + 1.2); g.lineTo(cx + 1, headY + 1.2); g.stroke();
      }
    }
    if (acc.indexOf('watch') >= 0 && dir === 'down') {
      g.fillStyle = '#8a6f3a'; rr(g, cx + 6.2, bodyY + 9.6, 3.4, 2.6, 1);
      g.fillStyle = '#e8f2f8'; circ(g, cx + 7.9, bodyY + 10.9, 1.05);
    }
    if (acc.indexOf('bag') >= 0 && dir !== 'up') {
      g.strokeStyle = '#6e4526'; g.lineWidth = 1.8;
      g.beginPath(); g.moveTo(cx - 6.4, bodyY + 1.2); g.lineTo(cx + 6.8, bodyY + 10.6); g.stroke(); // dây đeo chéo
      g.fillStyle = '#a05a2e'; rr(g, cx + 4.6, bodyY + 9.6, 8.6, 7, 1.6);                        // thân túi ở hông
      g.fillStyle = '#c47a42'; rr(g, cx + 4.6, bodyY + 9.6, 8.6, 2.6, 1.2);
    }
    if (acc.indexOf('hat') >= 0) {
      g.fillStyle = '#c73e3a';
      g.beginPath(); g.arc(cx, headY - 3.4, headR + 0.9, Math.PI, Math.PI * 2); g.fill();        // vòm mũ
      if (dir === 'down') { rr(g, cx - 4, headY - 4.4, 13.5, 2.6, 1.3); }                        // vành trước
      else if (side) { rr(g, cx + 1, headY - 4.4, 11, 2.6, 1.3); }
      else { rr(g, cx - 9.5, headY - 4.6, 19, 2.6, 1.3); }
    }

    g.restore();
    return c;
  }

  function makeCharacter(spec) {
    var set = {};
    ['down', 'up', 'right'].forEach(function (d) {
      set[d] = [drawChar(spec, d, 0), drawChar(spec, d, 1), drawChar(spec, d, 2)];
    });
    set.left = set.right; // lật hình khi vẽ (engine xử lý flip)
    return { frames: set, flipLeft: true };
  }

  window.SPRITES = {
    make: makeCharacter,   // hệ ngoại hình (style.js) dựng sprite theo spec người chơi tự chỉnh
    heroM: function () { return makeCharacter({ skin: '#f2c49b', hair: '#3a2e28', hairStyle: 'short', shirt: '#3f6fb5', pants: '#46536b' }); },
    heroF: function () { return makeCharacter({ skin: '#f6cba6', hair: '#5a3a26', hairStyle: 'pony', shirt: '#d96a86', pants: '#7a4a63', skirt: true }); },
    yui: function () { return makeCharacter({ skin: '#f6cba6', hair: '#6b4226', hairStyle: 'long', shirt: '#2e7f86', pants: '#444a52', apron: true }); },
    hung: function () { return makeCharacter({ skin: '#e0aa7d', hair: '#26221f', hairStyle: 'short', shirt: '#4a6741', pants: '#3c3a38', scar: true }); },
    staffF: function () { return makeCharacter({ skin: '#f6cba6', hair: '#3a2a20', hairStyle: 'pony', shirt: '#b03a48', pants: '#3f4652', apron: true }); },
    staffM: function () { return makeCharacter({ skin: '#f2c49b', hair: '#2c2622', hairStyle: 'short', shirt: '#31517d', pants: '#3f4652', apron: true }); },
    officer: function () { return makeCharacter({ skin: '#f2c49b', hair: '#4a4038', hairStyle: 'short', shirt: '#e8e6e0', pants: '#4a4640' }); },
    chef: function () { return makeCharacter({ skin: '#eec39c', hair: '#33302c', hairStyle: 'short', shirt: '#f0ede6', pants: '#5a5148', apron: true }); },
    mom: function () { return makeCharacter({ skin: '#eec39c', hair: '#4a3220', hairStyle: 'long', shirt: '#a05a78', pants: '#5d4a56', skirt: true }); },
    dad: function () { return makeCharacter({ skin: '#e0aa7d', hair: '#3c3630', hairStyle: 'short', shirt: '#6b7a56', pants: '#4c4438' }); },
    senpai: function () { return makeCharacter({ skin: '#eec39c', hair: '#57422a', hairStyle: 'short', shirt: '#7a4a2e', pants: '#3c3a38' }); },
    linh: function () { return makeCharacter({ skin: '#f6cba6', hair: '#4a2e20', hairStyle: 'long', shirt: '#e8a0b4', pants: '#8a5a78', skirt: true }); },
    guard: function () { return makeCharacter({ skin: '#f2c49b', hair: '#26221f', hairStyle: 'short', shirt: '#2c3e6b', pants: '#2c3550' }); },
    nurse: function () { return makeCharacter({ skin: '#f6cba6', hair: '#3a2a20', hairStyle: 'pony', shirt: '#eef3f5', pants: '#7a8a99' }); },
    monk: function () { return makeCharacter({ skin: '#eec39c', hair: '#eec39c', hairStyle: 'short', shirt: '#6b6259', pants: '#57504a' }); },
    elder: function () { return makeCharacter({ skin: '#e0aa7d', hair: '#d8d8d8', hairStyle: 'short', shirt: '#7a7264', pants: '#4c4438' }); },
    teacher: function () { return makeCharacter({ skin: '#f6cba6', hair: '#3a2a20', hairStyle: 'pony', shirt: '#5a7a8c', pants: '#3f4652' }); }
  };
})();
