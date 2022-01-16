"""
Server script for hosting games
"""

import socket
import json
import time
import random
import threading

# ADDR = "127."
PORT = 8000
MAX_PLAYERS = 3
MSG_SIZE = 2048

# Setup server socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((socket.gethostname(), PORT))
s.listen(MAX_PLAYERS)

players = {}


def generate_id(player_list: dict, max_players: int):
    """
    Generate a unique identifier

    Args:
        player_list (dict): dictionary of existing players
        max_players (int): maximum number of players allowed

    Returns:
        str: the unique identifier
    """

    while True:
        unique_id = str(random.randint(1, max_players))
        if unique_id not in player_list:
            return unique_id


def handle_messages(identifier: str):
    client_info = players[identifier]
    conn: socket.socket = client_info["socket"]
    username = client_info["username"]

    while True:
        try:
            msg = conn.recv(MSG_SIZE)
        except ConnectionResetError:
            break

        if not msg:
            break

        msg_decoded = msg.decode("utf8")

        try:
            msg_json = json.loads(msg)
        except Exception as e:
            print(e)
            continue

        print(f"Received message from player {username} with ID {identifier}")

        if msg_json["object"] == "player":
            players[identifier]["position"] = msg_json["position"]
            players[identifier]["direction"] = msg_json["direction"]
            players[identifier]["health"] = msg_json["health"]

        # Tell other players about player moving
        for player_id in players:
            if player_id != identifier:
                player_info = players[player_id]
                player_conn: socket.socket = player_info["socket"]
                print(msg_json['object'])
                try:
                    player_conn.sendall(msg_decoded.encode("utf8"))
                except OSError:
                    pass

    # Tell other players about player leaving
    for player_id in players:
        if player_id != identifier:
            player_info = players[player_id]
            player_conn: socket.socket = player_info["socket"]
            try:
                player_conn.send(json.dumps({"id": identifier, "object": "player", "joined": False, "left": True}).encode("utf8"))
            except OSError:
                pass

    print(f"Player {username} with ID {identifier} has left the game...")
    del players[identifier]
    conn.close()

def initPlayerInfo(info: str):
    msg_json={}
    try:
        msg_json = json.loads(info)
    except Exception as e:
        print('err')

    usrname = msg_json["username"]
    heath = msg_json["health"]
    damage = msg_json["damage"]
    ship = msg_json["ship"]

    x = random.randint(-19, 19)
    y = random.randint(-19, 19)
    # if len(players) > 0:
    #     while (x, y) == any(players.):
    #         x = random.randint(-19, 19)
    #         y = random.randint(-19, 19)

    position = (x, y)

    return {'username': usrname, 'position': position, 'health': heath, 'damage': damage, 'ship': ship}


def main():
    print("Server started, listening for new connections...")

    while True:
        # Accept new connection and assign unique ID
        conn, addr = s.accept()
        new_id = generate_id(players, MAX_PLAYERS)
        conn.send(new_id.encode("utf8"))
        recv_info = conn.recv(MSG_SIZE).decode("utf8")


        init_info = initPlayerInfo(recv_info)

        new_player_info = {
            "socket": conn, 
            "username": init_info['username'], 
            "position": init_info['position'], 
            "direction": 0, 
            "health": init_info['health'],
            "damage": init_info['damage'],
            "ship": init_info['ship'],
        }
        conn.send(
            (str(new_player_info['position'][0]) + ' ' +
                str(new_player_info['position'][1]))
            .encode('utf8'))

        # Tell existing players about new player
        for player_id in players:
            if player_id != new_id:
                player_info = players[player_id]
                player_conn: socket.socket = player_info["socket"]

                try:
                    player_conn.send(json.dumps({
                        "id": new_id,
                        "object": "player",
                        "username": new_player_info["username"],
                        "position": new_player_info["position"],
                        "health": new_player_info["health"],
                        "damage": new_player_info['damage'],
                        "ship": new_player_info['ship'],
                        "joined": True,
                        "left": False
                    }).encode("utf8"))
                except OSError:
                    pass

        # Tell new player about existing players
        for player_id in players:
            if player_id != new_id:
                player_info = players[player_id]
                try:
                    conn.send(json.dumps({
                        "id": player_id,
                        "object": "player",
                        "username": player_info["username"],
                        "position": player_info["position"],
                        "health": player_info["health"],
                        "damage": player_info['damage'],
                        "ship": player_info['ship'],
                        "joined": True,
                        "left": False
                    }).encode("utf8"))
                    time.sleep(0.1)
                except OSError:
                    pass

        # Add new player to players list, effectively allowing it to receive messages from other players
        players[new_id] = new_player_info

        # Start thread to receive messages from client
        msg_thread = threading.Thread(target=handle_messages, args=(new_id,), daemon=True)
        msg_thread.start()

        print(f"New connection from {addr}, assigned ID: {new_id}...")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        pass
    except SystemExit:
        pass
    finally:
        print("Exiting")
        s.close()
